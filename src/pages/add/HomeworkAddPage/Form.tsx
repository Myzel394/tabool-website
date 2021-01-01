/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {memo, useMemo, useState} from "react";
import {ErrorMessage, Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {Box, FormGroup, FormHelperText, Grid} from "@material-ui/core";
import {
    FocusedPage,
    FormikLessonField,
    HomeworkDueDateField,
    HomeworkInformationField,
    HomeworkTypeField,
    LoadingOverlay,
    PrimaryButton,
} from "components";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {ISendHomeworkData} from "hooks/apis";
import * as yup from "yup";
import dayjs from "dayjs";
import {useQueryString} from "hooks";
import {LessonFieldRef} from "components/inputs/LessonField";
import {ErrorFieldsInjection} from "types";
import {CheckboxWithLabel} from "formik-material-ui";
import {Alert} from "@material-ui/lab";

export interface IForm {
    onSubmit: (data: ISendHomeworkData, formikHelpers: FormikHelpers<ISendHomeworkData>) => Promise<any>;
}

type FormikForm = ISendHomeworkData & ErrorFieldsInjection;

const schema = yup.object({
    isPrivate: yup.boolean(),
    lesson: yup.string().required(),
    information: yup.string().nullable(),
    type: yup.string(),
    dueDate: yup.date().min(dayjs()).nullable(),
});

const Form = ({
    onSubmit,
}: IForm) => {
    const {
        lesson: lessonId,
        type: givenType,
        dueDate: dueDateString,
        isPrivate: givenIsPrivate,
    } = useQueryString({
        parseBooleans: true,
        parseNumbers: false,
    });
    const {t} = useTranslation();

    const [$lesson, set$Lesson] = useState<LessonFieldRef>();

    const initialValues = useMemo(() => ({
        lesson: typeof lessonId === "string" ? lessonId : null,
        type: typeof givenType === "string" ? givenType : null,
        dueDate: (typeof dueDateString === "string" && dayjs(dueDateString).isValid()) ? dayjs(dueDateString) : null,
        isPrivate: typeof givenIsPrivate === "boolean" ? givenIsPrivate : false,
    }), [lessonId, givenType, dueDateString, givenIsPrivate]);

    return (
        <FocusedPage title={t("Hausaufgabe hinzufügen")}>
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
                                        <FormikLessonField
                                            innerRef={reference => {
                                                if (reference && !_.isEqual(reference, $lesson)) {
                                                    set$Lesson(reference);
                                                }
                                            }}
                                            name="lesson"
                                            type="text"
                                            label={t("Stunde")}
                                            helpText={t("Von welcher Stunde aus die Hausaufgabe aufgegeben wurde.").toString()}
                                            onChange={value => setFieldValue("lesson", value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            name="dueDate"
                                            label={t("Fälligkeitsdatum")}
                                            component={HomeworkDueDateField}
                                            lesson={$lesson}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            type="text"
                                            name="type"
                                            component={HomeworkTypeField}
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
                                                <ErrorMessage name="isPrivate" />
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
        </FocusedPage>
    );
};

export default memo(Form);
