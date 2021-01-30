/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {memo, useState} from "react";
import {ErrorMessage, Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {Box, FormGroup, FormHelperText, Grid, InputAdornment} from "@material-ui/core";
import {
    HomeworkInformationField,
    HomeworkTypeField,
    LessonField,
    LessonFieldRef,
    LoadingOverlay,
    PrimaryButton,
    renderDayWithLessonWeekdays,
} from "components";
import {useTranslation} from "react-i18next";
import {ISendHomeworkData} from "hooks/apis";
import * as yup from "yup";
import dayjs from "dayjs";
import {useColors, useQueryString} from "hooks";
import {CourseDetail, ErrorFieldsInjection} from "types";
import {CheckboxWithLabel} from "formik-material-ui";
import {Alert} from "@material-ui/lab";
import {DateTimePicker} from "formik-material-ui-pickers";
import {FaCalendarDay} from "react-icons/all";

export interface IForm {
    onSubmit: (data: ISendHomeworkData, formikHelpers: FormikHelpers<ISendHomeworkData>) => Promise<any>;
}

type FormikForm = ISendHomeworkData & ErrorFieldsInjection;

const Form = ({
    onSubmit,
}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();
    const {
        lesson: lessonId,
        type: givenType,
        dueDate: dueDateString,
        isPrivate: givenIsPrivate,
    } = useQueryString({
        parseBooleans: true,
        parseNumbers: false,
    });

    const [course, setCourse] = useState<CourseDetail>();

    // noinspection SuspiciousTypeOfGuard: Type can in fact have bool type
    const initialValues = {
        lesson: typeof lessonId === "string" ? lessonId : null,
        type: typeof givenType === "string" ? givenType : null,
        dueDate: (typeof dueDateString === "string" && dayjs(dueDateString).isValid()) ? dayjs(dueDateString) : null,
        isPrivate: typeof givenIsPrivate === "boolean" ? givenIsPrivate : false,
    };

    const schema = yup.object({
        isPrivate: yup.boolean(),
        lesson: yup.string().required(),
        information: yup.string().nullable(),
        type: yup.string().nullable(),
        dueDate: yup.date().min(dayjs(), "Das Fälligkeitsdatum kann nicht in der Vergangenheit liegen.").nullable(),
    });

    const renderDueDateDay = course && renderDayWithLessonWeekdays(course.weekdays, course.subject.userRelation.color);

    return (
        <Formik<FormikForm>
            validationSchema={schema}
            // @ts-ignore: Values will be validated before sending, so initial values can be invalid
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({isSubmitting, setFieldValue, touched, errors, values}) => (
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={2}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Field
                                        disablePast
                                        innerRef={(reference: LessonFieldRef) => {
                                            const referenceCourse = reference.lesson.course;

                                            if (reference && referenceCourse.id === course?.id) {
                                                setCourse(referenceCourse);
                                            }
                                        }}
                                        value={values.lesson}
                                        name="lesson"
                                        type="text"
                                        label={t("Stunde")}
                                        helpText={t("Von welcher Stunde aus die Hausaufgabe aufgegeben wurde.").toString()}
                                        component={LessonField}
                                        onChange={value => setFieldValue("lesson", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        fullWidth
                                        name="dueDate"
                                        inputVariant="outlined"
                                        format="LLL"
                                        label={t("Fälligkeitsdatum")}
                                        component={DateTimePicker}
                                        renderDay={renderDueDateDay}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FaCalendarDay color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
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
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="isPrivate"
                                            Label={{label: t("Privat für mich")}}
                                        />
                                        <FormHelperText error={Boolean(touched.isPrivate && errors.isPrivate)}>
                                            {errors.isPrivate ? <ErrorMessage name="isPrivate" /> : t(
                                                "Private Hausaufgaben sind nur für dich sichtbar. Sobald einmal für den Kurs veröffentlicht, kannst du sie nicht mehr editieren.",
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
                        <PrimaryButton type="submit" disabled={isSubmitting}>
                            {t("Hausaufgabe hinzufügen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            )}
        </Formik>
    );
};

export default memo(Form);
