/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {memo} from "react";
import {ISendExamData} from "hooks/apis";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {useColors, useQueryString} from "hooks";
import dayjs from "dayjs";
import {CourseField, FocusedPage, FormikLessonField, LoadingOverlay, PlaceField} from "components";
import {useTranslation} from "react-i18next";
import {ErrorFieldsInjection} from "types";
import * as yup from "yup";
import {Box, Grid, InputAdornment} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {FaCalendarDay} from "react-icons/all";


export interface IForm {
    onSubmit: (data: ISendExamData, formikHelpers: FormikHelpers<ISendExamData>) => Promise<any>;
}

type FormikForm = ISendExamData & ErrorFieldsInjection;

const schema = yup.object({
    course: yup.string().required(),
    room: yup.string().nullable(),
    targetedDate: yup.date().required(),
    information: yup.string().nullable(),
});

const ALLOWED_DAYS = [1, 2, 3, 4, 5];

const Form = ({onSubmit}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();
    const {
        course: courseId,
        place: placeId,
        targetedDate: targetedDateString,
        information: givenInformation,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });

    const initialValues = {
        course: typeof courseId === "string" ? courseId : null,
        place: typeof placeId === "string" ? placeId : null,
        targetedDate: (typeof targetedDateString === "string" && dayjs(targetedDateString).isValid()) ? dayjs(targetedDateString) : null,
        information: typeof givenInformation === "string" ? givenInformation : null,
    };

    return (
        <FocusedPage title={t("Klassenarbeit hinzufügen")}>
            <Formik<FormikForm>
                validationSchema={schema}
                // @ts-ignore: Values will be validated before sending, so initial values can be invalid
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({isSubmitting, setFieldValue, values}) => (
                    <LoadingOverlay isLoading={isSubmitting}>
                        <IkForm>
                            <Box mb={2}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Field
                                            required
                                            component={CourseField}
                                            type="text"
                                            name="course"
                                            variant="outlined"
                                            label={t("Kurs / Fach")}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Field
                                            required
                                            label={t("Datum")}
                                            helperText={t("Der Tag, an dem die Klassenarbeit geschrieben wird.")}
                                            type="text"
                                            name="targetedDate"
                                            component={FormikLessonField}
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
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Field
                                            fullWidth
                                            type="text"
                                            name="place"
                                            component={PlaceField}
                                            label={t("Raum")}
                                            helperText={t("Wo die Klassenarbeit geschrieben wird.")}
                                            onChange={event => setFieldValue("place", event.target.value.id)}
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
                        </IkForm>
                    </LoadingOverlay>
                )}
            </Formik>
        </FocusedPage>
    );
};

export default memo(Form);
