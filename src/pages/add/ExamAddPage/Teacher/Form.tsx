import React, {useState} from "react";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {LoadingOverlay, PrimaryButton, renderDayWithLessonWeekdays, TeacherCourseField} from "components";
import {Box, Grid, InputAdornment} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {useTranslation} from "react-i18next/src";
import {DatePicker} from "formik-material-ui-pickers";
import {FaCalendarDay, MdAdd} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {useColors} from "hooks";
import {TeacherCourseDetail} from "types";
import FormikRemember from "formik-remember";
import {useFetchTeacherCourseDetailAPI} from "hooks/apis";
import {convertToDate} from "api";

import useInitialValues, {FormikForm} from "./useInitialValues";
import useSchema from "./useSchema";


export interface IForm {
    onSubmit: (data: FormikForm, formikHelpers: FormikHelpers<FormikForm>) => any;
}

const parseData = (stringData: string): FormikForm => {
    const data: FormikForm = JSON.parse(stringData);
    convertToDate(data, ["date"]);

    return data;
};

const Form = ({
    onSubmit,
}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();
    const initialValues = useInitialValues();
    const schema = useSchema();
    const fetchCourse = useFetchTeacherCourseDetailAPI();

    const [course, setCourse] = useState<TeacherCourseDetail>();

    const renderDueDateDay = course && renderDayWithLessonWeekdays(
        course.weekdays,
        course.subject.userRelation.color,
    );

    return (
        <Formik<FormikForm>
            validationSchema={schema}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Values will be validated before sending, so initial values will not be invalid
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={5}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Field
                                        name="courseId"
                                        component={TeacherCourseField}
                                        onSelect={setCourse}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        required
                                        fullWidth
                                        name="title"
                                        label={t("Titel")}
                                        component={TextField}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        disablePast
                                        required
                                        fullWidth
                                        component={DatePicker}
                                        inputVariant="outlined"
                                        ampm={false}
                                        format="LL"
                                        label={t("Datum")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FaCalendarDay color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        name="date"
                                        renderDay={renderDueDateDay}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        multiline
                                        fullWidth
                                        required
                                        type="text"
                                        variant="outlined"
                                        name="information"
                                        label={t("Informationen")}
                                        component={TextField}
                                    />
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
                                {t("Arbeit hinzufügen")}
                            </PrimaryButton>
                        </Box>
                        <FormikRemember<FormikForm>
                            name="teacher-exam-add"
                            parse={parseData}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onLoaded={data => {
                                if (data.courseId) {
                                    fetchCourse(data.courseId).then(setCourse);
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
