import React from "react";
import {ILoginData, ILoginResponse} from "hooks/apis";
import {useTranslation} from "react-i18next";
import Title from "components/pages/FocusedPage/Title";
import {Box, Typography} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {LoadingOverlay, PrimaryButton} from "components";
import {TextField} from "formik-material-ui";


export interface SuspiciousLoginFormProps {
    onSubmit: (form: ILoginData) => Promise<ILoginResponse>;
    loginData: ILoginData;
}

interface FormikForm {
    otpKey: string;
}


const SuspiciousLoginForm = ({onSubmit, loginData}: SuspiciousLoginFormProps) => {
    const {t} = useTranslation();

    const validationSchema = yup.object({
        otpKey: yup
            .string()
            .length(6, t("Der Code ist zu kurz."))
            .required(t("Dein OTP wird benötigt.")),
    });

    return (
        <>
            <Title title={t("Verdächtige Anmeldung")} />
            <Typography>
                {t("Diese Anmeldung scheint verdächtig zu sein. Damit niemand unbefugtes Zugang erlangt, wurde dir per E-Mail ein Code zugeschickt.")}
            </Typography>
            <Formik<FormikForm>
                initialValues={{
                    otpKey: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setErrors, setSubmitting}) =>
                    onSubmit({
                        ...loginData,
                        ...values,
                    })
                        .catch((error) => {
                            if (error.response?.data) {
                                setErrors(error.response.data);
                            }
                        })
                        .finally(() => setSubmitting(false))
                }
            >
                {({isSubmitting}) => (
                    <LoadingOverlay isLoading={isSubmitting}>
                        <Form>
                            <Box mb={4} mt={2}>
                                <Field
                                    fullWidth
                                    required
                                    autoFocus
                                    component={TextField}
                                    name="otpKey"
                                    label={t("OTP")}
                                    variant="outlined"
                                />
                            </Box>
                            <PrimaryButton type="submit">
                                {t("Anmelden")}
                            </PrimaryButton>
                        </Form>
                    </LoadingOverlay>
                )}
            </Formik>
        </>
    );
};

export default SuspiciousLoginForm;
