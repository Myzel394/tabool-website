import React, {useState} from "react";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {TeacherLessonDetail} from "types";
import {
    GenderStatus,
    HomeworkDueDateField,
    HomeworkInformationField,
    HomeworkTypeField,
    LessonField,
    LoadingOverlay,
    PrimaryButton,
    renderDayWithLessonWeekdays,
} from "components";
import {
    Box,
    CircularProgress,
    Collapse,
    FormControl,
    FormGroup,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import dayjs from "dayjs";
import {getEndTime, getNextLessonDate, getStartTime, LessonDate} from "utils";
import {useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";
import {CheckboxWithLabel, Select} from "formik-material-ui";
import {Alert} from "@material-ui/lab";
import {MdAdd} from "react-icons/all";
import FormikRemember from "formik-remember";
import {convertToDate} from "api";


import useSchema from "./useSchema";
import useInitialValues, {FormikForm} from "./useInitialValues";

export interface IForm {
    onSubmit: (data: FormikForm, formikHelpers: FormikHelpers<FormikForm>) => any;
}

const parseData = (stringData: string): FormikForm => {
    const data: FormikForm = JSON.parse(stringData);
    convertToDate(data, ["dueDate", "lesson.date"]);

    return data;
};

const Form = ({
    onSubmit,
}: IForm) => {
    const {t} = useTranslation();
    const initialValues = useInitialValues();
    const schema = useSchema();
    const {addSnackbar} = useSnackbar();

    const [lesson, setLesson] = useState<TeacherLessonDetail>();

    const renderDueDateDay = lesson && renderDayWithLessonWeekdays(
        lesson.course.weekdays,
        lesson.course.subject.userRelation.color,
    );

    return (
        <Formik<FormikForm>
            validationSchema={schema}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Values will be validated before sending, so initial values will not be invalid
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({isSubmitting, setFieldValue, values, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={5}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Field
                                        required
                                        disablePast
                                        innerRef={reference => {
                                            if (reference.lesson) {
                                                setLesson(reference.lesson);
                                            }
                                        }}
                                        name="lesson"
                                        label={t("Stunde")}
                                        component={LessonField}
                                        onChange={async event => {
                                            const lesson: TeacherLessonDetail = event.target.lesson;

                                            setFieldValue("lesson", event.target.value);
                                            setLesson(lesson);

                                            if (!values.dueDate && lesson) {
                                                const {startHour, endHour, course: {weekdays}} = lesson;
                                                const startTime = dayjs(getStartTime(startHour));
                                                const endTime = dayjs(getEndTime(endHour));

                                                const lessonDates: LessonDate[] = weekdays.map(weekday => ({
                                                    weekday,
                                                    startTime,
                                                    endTime,
                                                }));

                                                const nextDate = getNextLessonDate(dayjs(), lessonDates);

                                                setFieldValue("dueDate", nextDate);

                                                addSnackbar(t("Fälligkeitsdatum automatisch auf Anfang nächster Stunde eingestellt"), {
                                                    variant: "info",
                                                });
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <HomeworkDueDateField
                                        required
                                        fullWidth
                                        name="dueDate"
                                        renderDay={renderDueDateDay}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        type="text"
                                        name="type"
                                        label={t("Typ")}
                                        component={HomeworkTypeField}
                                        helperText={t("Typ der Hausaufgabe - Beispiel: Wiederholung, Vorbereitung")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={HomeworkInformationField}
                                        name="information"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <Field
                                            name="isPrivate"
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            Label={{label: t("Private Hausaufgabe")}}
                                        />
                                        {!values.isPrivate &&
                                            <FormHelperText>
                                                {t("Eine private Hausaufgabe ist nur für einen Schüler auf.")}
                                            </FormHelperText>
                                        }
                                    </FormGroup>
                                    <Collapse in={values.isPrivate}>
                                        {(() => {
                                            if (!values.lesson) {
                                                return (
                                                    <Alert severity="warning">
                                                        {t("Wähle eine Stunde aus")}
                                                    </Alert>
                                                );
                                            }
                                            if (!lesson) {
                                                return <CircularProgress />;
                                            }

                                            return (
                                                <Box mt={2}>
                                                    <FormControl
                                                        required
                                                        fullWidth
                                                        variant="outlined"
                                                    >
                                                        <InputLabel>
                                                            {t("Schüler")}
                                                        </InputLabel>
                                                        <Field
                                                            component={Select}
                                                            defaultValue=""
                                                            type="radio"
                                                            name="privateToStudentId"
                                                            label={t("Schüler")}
                                                        >
                                                            {lesson.course.participants.map(student =>
                                                                <MenuItem key={student.id} value={student.id}>
                                                                    {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
                                                                    <Box display="flex" alignItems="center">
                                                                        <GenderStatus justIcon withColor value={student.gender} />
                                                                        {`${student.firstName} ${student.lastName}`}
                                                                    </Box>
                                                                </MenuItem>)}
                                                        </Field>
                                                    </FormControl>
                                                </Box>
                                            );
                                        })()}
                                    </Collapse>
                                </Grid>
                                {errors.nonFieldErrors &&
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            {errors.nonFieldErrors}
                                        </Alert>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <PrimaryButton size="large" type="submit" disabled={isSubmitting} startIcon={<MdAdd />}>
                                {t("Hausaufgabe hinzufügen")}
                            </PrimaryButton>
                        </Box>
                        <FormikRemember<FormikForm>
                            name="teacher-homework-add"
                            parse={parseData}
                        />
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};
export default Form;

