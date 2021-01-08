import React, {memo} from "react";
import {ISendRoomData} from "hooks/apis";
import {ErrorFieldsInjection} from "types";
import {Field, Form as IkForm, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import {useQueryString} from "hooks";
import {Box} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import {LoadingOverlay, PrimaryButton} from "components";


export interface IForm {
    onSubmit: (data: ISendRoomData, formikHelpers: FormikHelpers<ISendRoomData>) => Promise<any>;
}

type FormikForm = ISendRoomData & ErrorFieldsInjection;

const Form = ({onSubmit}: IForm) => {
    const {t} = useTranslation();
    const {
        placeName,
    } = useQueryString();

    const validationSchema = yup.object({
        place: yup
            .string()
            .required()
            .matches(
                /^(([A-Z]{1,2}[0-9]?)|([0-9]){3})|([A-Z][A-Z ]{62})$/,
                t("Ungültiger Ortname. Benutze die Kurzform deines Orts. Bei Ziffern benutze insgesamt 3 Zahlen (0 am Anfang wenn die Zahl kleiner als 100 ist)."),
            ),
    });

    return (
        <Formik<FormikForm>
            validationSchema={validationSchema}
            initialValues={{
                place: typeof placeName === "string" ? placeName : "",
            }}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <IkForm>
                    <LoadingOverlay isLoading={isSubmitting}>
                        <Box mb={2}>
                            <Field
                                required
                                fullWidth
                                component={TextField}
                                name="place"
                                type="text"
                                label={t("Ortsname")}
                                variant="outlined"
                            />
                            {errors.nonFieldErrors &&
                                <Alert severity="error">
                                    {errors.nonFieldErrors}
                                </Alert>
                            }
                        </Box>
                        <PrimaryButton disabled={isSubmitting} type="submit">
                            {t("Raum hinzufügen")}
                        </PrimaryButton>
                    </LoadingOverlay>
                </IkForm>
            }
        </Formik>
    );
};

export default memo(Form);
