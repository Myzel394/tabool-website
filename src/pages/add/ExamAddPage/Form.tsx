/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {useState} from "react";
import {ISendExamData, useFetchCourseDetailAPI} from "hooks/apis";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {useColors, useQueryOptions, useQueryString} from "hooks";
import dayjs from "dayjs";
import {CourseField, LoadingOverlay, PlaceField, PrimaryButton, renderDayWithLessonWeekdays} from "components";
import {useTranslation} from "react-i18next";
import {CourseDetail, ErrorFieldsInjection} from "types";
import * as yup from "yup";
import {Box, Grid, InputAdornment} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {DatePicker} from "formik-material-ui-pickers";
import {FaCalendarDay} from "react-icons/all";
import {useQuery} from "react-query";
import {AxiosError} from "axios";


export interface IForm {
    onSubmit: (data: ISendExamData, formikHelpers: FormikHelpers<ISendExamData>) => Promise<any>;
}

type FormikForm = ISendExamData & ErrorFieldsInjection;

const ALLOWED_DAYS = [1, 2, 3, 4, 5];

const Form = ({onSubmit}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const queryOptions = useQueryOptions();
    const fetchCourse = useFetchCourseDetailAPI();
    const {t} = useTranslation();
    const {
        course: parameterCourseId,
        place: placeId,
        targetedDate: targetedDateString,
        information: givenInformation,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });
    const initialValues = {
        courseId: typeof parameterCourseId === "string" ? parameterCourseId : null,
        placeId: typeof placeId === "string" ? placeId : null,
        targetedDate: (typeof targetedDateString === "string" && dayjs(targetedDateString).isValid()) ? dayjs(targetedDateString) : null,
        information: typeof givenInformation === "string" ? givenInformation : null,
    };
    const schema = yup.object({
        courseId: yup.string().required(t("Dieses Feld wird benötigt.")),
        placeId: yup.string().nullable(),
        targetedDate: yup.date().typeError(t("Dieses Feld wird benötigt.")).required(t("Dieses Feld wird benötigt.")),
        information: yup.string().nullable(),
    });

    const [courseId, setCourseId] = useState<string | null>(initialValues.courseId);

    const {
        data: course,
    } = useQuery<CourseDetail | void, AxiosError, string>(
        ["fetch_course", courseId],
        () => {
            if (courseId) {
                return fetchCourse(courseId);
            }
        },
        {
            ...queryOptions,
            enabled: Boolean(courseId),
        },
    );
    const renderDay = (() => {
        if (course) {
            const color = course.subject.userRelation.color;
            const weekdays = course.weekdays;

            return renderDayWithLessonWeekdays(weekdays, color);
        }
    })();

    return (
        <Formik<FormikForm>
            validationSchema={schema}
            // @ts-ignore: Values will be validated before sending, so initial values can be invalid
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({isSubmitting, setFieldValue, values, touched, errors}) => (
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        required
                                        component={CourseField}
                                        type="text"
                                        name="courseId"
                                        variant="outlined"
                                        label={t("Kurs / Fach")}
                                        onChange={course => setCourseId(course.id)}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        required
                                        label={t("Datum")}
                                        helperText={(touched.targetedDate && errors.targetedDate) ? errors.targetedDate : t("Der Tag, an dem die Klassenarbeit geschrieben wird.")}
                                        type="text"
                                        name="targetedDate"
                                        component={DatePicker}
                                        shouldDisableDate={date => Boolean(date && !ALLOWED_DAYS.includes(date.day()))}
                                        inputVariant="outlined"
                                        format="LL"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FaCalendarDay color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        renderDay={renderDay}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        fullWidth
                                        type="text"
                                        name="placeId"
                                        component={PlaceField}
                                        label={t("Ort")}
                                        helperText={t("Wo die Klassenarbeit geschrieben wird.")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        multiline
                                        fullWidth
                                        label={t("Informationen")}
                                        type="text"
                                        name="information"
                                        component={TextField}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Klassenarbeit hinzufügen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            )}
        </Formik>
    );
};

export default Form;
