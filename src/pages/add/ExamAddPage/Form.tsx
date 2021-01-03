/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {memo} from "react";
import {ISendExamData} from "hooks/apis";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import {useQueryString} from "hooks";
import dayjs from "dayjs";
import {FocusedPage, LoadingOverlay, PlaceField} from "components";
import {useTranslation} from "react-i18next";
import {ErrorFieldsInjection} from "types";
import * as yup from "yup";
import {Box, Grid} from "@material-ui/core";
import {DatePicker} from "formik-material-ui-pickers";
import {TextField} from "formik-material-ui";


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
    const {t} = useTranslation();
    const {
        course: courseId,
        room: roomId,
        targetedDate: targetedDateString,
        information: givenInformation,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });

    const initialValues = {
        course: typeof courseId === "string" ? courseId : undefined,
        room: typeof roomId === "string" ? roomId : undefined,
        targetedDate: (typeof targetedDateString === "string" && dayjs(targetedDateString).isValid()) ? dayjs(targetedDateString) : null,
        information: typeof givenInformation === "string" ? givenInformation : undefined,
    };

    return (
        <FocusedPage title={t("Klassenarbeit hinzufügen")}>
            <Formik<FormikForm>
                validationSchema={schema}
                // @ts-ignore: Values will be validated before sending, so initial values can be invalid
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({isSubmitting, setFieldValue}) => (
                    <LoadingOverlay isLoading={isSubmitting}>
                        <IkForm>
                            <Box mb={2}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Field
                                            required
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
                                            component={DatePicker}
                                            shouldDisableDate={date => Boolean(date && !ALLOWED_DAYS.includes(date.day()))}
                                            inputVariant="outlined"
                                            format="LL"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <Field
                                            fullWidth
                                            type="text"
                                            name="room"
                                            component={PlaceField}
                                            label={t("Raum")}
                                            helperText={t("Wo die Klassenarbeit geschrieben wird.")}
                                            onChange={event => {
                                                // eslint-disable-next-line no-console
                                                console.log("#vant");
                                            }}
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
