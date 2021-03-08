/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {useState} from "react";
import {ICreateStudentHomeworkData} from "hooks/apis";
import {ErrorFieldsInjection, StudentHomeworkDetail, StudentLessonDetail} from "types";
import {useQueryString, useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import * as yup from "yup";
import {
    HomeworkDueDateField,
    HomeworkInformationField,
    HomeworkTypeField,
    LessonField,
    LoadingOverlay,
    PrimaryButton,
    renderDayWithLessonWeekdays,
} from "components";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {Box, FormGroup, FormHelperText, Grid} from "@material-ui/core";
import {CheckboxWithLabel} from "formik-material-ui";
import {Alert} from "@material-ui/lab";
import {MdAdd} from "react-icons/all";
import {getEndTime, getNextLessonDate, getStartTime, LessonDate} from "utils";
import {LessonIdentifier} from "components/formik/LessonField/LessonFieldContext";

type FormikForm = Omit<ICreateStudentHomeworkData, "lessonId" | "lessonDate"> & ErrorFieldsInjection & {
    lesson: LessonIdentifier;
};

export interface IForm {
    onSubmit: (data: FormikForm, formikHelpers: FormikHelpers<FormikForm>) => Promise<StudentHomeworkDetail>;
}

const Form = ({
    onSubmit,
}: IForm) => {
    const {t} = useTranslation();
    const {addSnackbar} = useSnackbar();
    const {
        lesson: lessonId,
        type: givenType,
        dueDate: dueDateString,
        isPrivate: givenIsPrivate,
    } = useQueryString({
        parseBooleans: true,
        parseNumbers: false,
    });

    const [lesson, setLesson] = useState<StudentLessonDetail>();

    // noinspection SuspiciousTypeOfGuard: Type can in fact have bool type
    const initialValues = {
        lesson: typeof lessonId === "string" ? lessonId : null,
        type: typeof givenType === "string" ? givenType : null,
        dueDate: (typeof dueDateString === "string" && dayjs(dueDateString).isValid()) ? dayjs(dueDateString) : null,
        isPrivate: typeof givenIsPrivate === "boolean" ? givenIsPrivate : false,
    };

    const schema = yup.object().shape({
        isPrivate: yup.boolean(),
        lesson: yup.object().typeError(t("Die Stunde wird benötigt.")).required(),
        information: yup.string().nullable(),
        type: yup.string().nullable(),
        dueDate: yup.date().min(dayjs(), "Das Fälligkeitsdatum kann nicht in der Vergangenheit liegen.").nullable(),
    });

    const renderDueDateDay = lesson && renderDayWithLessonWeekdays(lesson.course.weekdays, lesson.course.subject.userRelation.color);

    return (
        <Formik<FormikForm>
            validationSchema={schema}
            // @ts-ignore: Values will be validated before sending, so initial values can be invalid
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors, setFieldValue, values}) => (
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
                                            const lesson: StudentLessonDetail = event.target.lesson;

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
                                            checked
                                            disabled
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            Label={{label: t("Private Hausaufgabe")}}
                                        />
                                        <FormHelperText>
                                            {t(
                                                "Du kannst nur private Hausaufgaben erstellen, da du Schüler bist.",
                                            )}
                                        </FormHelperText>
                                    </FormGroup>
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
                    </IkForm>
                </LoadingOverlay>
            )}
        </Formik>
    );
};
export default Form;


