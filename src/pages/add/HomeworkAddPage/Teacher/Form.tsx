import React, {useState} from "react";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {TeacherLessonDetail} from "types";
import {
    HomeworkDueDateField,
    HomeworkInformationField,
    HomeworkTypeField,
    LessonField,
    LoadingOverlay,
    PrimaryButton,
    renderDayWithLessonWeekdays,
} from "components";
import {Box, Collapse, FormGroup, FormHelperText, Grid} from "@material-ui/core";
import dayjs from "dayjs";
import {getEndTime, getNextLessonDate, getStartTime, LessonDate} from "utils";
import {useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";
import {CheckboxWithLabel} from "formik-material-ui";
import {Alert} from "@material-ui/lab";
import {MdAdd} from "react-icons/all";
import FormikRemember from "formik-remember";
import {convertToDate} from "api";
import {useFetchTeacherLessonAPI} from "hooks/apis";

import useSchema from "./useSchema";
import useInitialValues, {FormikForm} from "./useInitialValues";
import Students from "./Students";

export interface FormProps {
    onSubmit: (data: FormikForm, formikHelpers: FormikHelpers<FormikForm>) => any;
}

const parseData = (stringData: string): FormikForm => {
    const data: FormikForm = JSON.parse(stringData);
    convertToDate(data, ["dueDate", "lesson.date"]);

    return data;
};

const Form = ({
    onSubmit,
}: FormProps) => {
    const {t} = useTranslation();
    const initialValues = useInitialValues();
    const schema = useSchema();
    const {addSnackbar} = useSnackbar();
    const fetchLesson = useFetchTeacherLessonAPI();

    const [isError, setIsError] = useState<boolean>(false);
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
                                        name="lesson"
                                        label={t("Stunde")}
                                        component={LessonField}
                                        onLessonFetch={newLesson => {
                                            // Handles init lesson fetch
                                            if (!lesson) {
                                                setLesson(newLesson);
                                            }
                                        }}
                                        onError={() => setIsError(true)}
                                        onChange={async event => {
                                            setIsError(false);
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
                                        {!values.isPrivate && (
                                            <FormHelperText>
                                                {t("Eine private Hausaufgabe ist nur für einen Schüler auf.")}
                                            </FormHelperText>
                                        )}
                                    </FormGroup>
                                    <Collapse in={values.isPrivate}>
                                        <Students
                                            hasLessonSelected={Boolean(values.lesson)}
                                            students={lesson?.course.participants}
                                            isError={isError}
                                        />
                                    </Collapse>
                                </Grid>
                                {errors.nonFieldErrors && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            {errors.nonFieldErrors}
                                        </Alert>
                                    </Grid>
                                )}
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
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onLoaded={async data => {
                                setIsError(false);
                                if (data.lesson) {
                                    try {
                                        const {lessonInformation} = await fetchLesson({
                                            lessonDate: data.lesson.date,
                                            lessonId: data.lesson.id,
                                        });
                                        setLesson(lessonInformation);
                                    } catch (err) {
                                        setIsError(true);
                                    }
                                }
                            }}
                        />
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};
export default Form;

