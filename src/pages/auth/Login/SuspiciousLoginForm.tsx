import React, {memo} from "react";
import {ILoginData, ILoginResponse} from "hooks/apis";
import {useTranslation} from "react-i18next";
import Title from "components/pages/FocusedPage/Title";
import {Box, Typography} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {LoadingOverlay, PrimaryButton} from "components";
import {TextField} from "formik-material-ui";


export interface ISuspiciousLoginForm {
    onSubmit: (form: ILoginData) => Promise<ILoginResponse>;
    loginData: ILoginData;
}

interface FormikForm {
    otpKey: string;
}

const schema = yup.object({
    otpKey: yup.string().length(6).required(),
});


const SuspiciousLoginForm = ({onSubmit, loginData}: ISuspiciousLoginForm) => {
    const {t} = useTranslation();

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
                validationSchema={schema}
                onSubmit={(values, {setErrors, setSubmitting}) =>
                    onSubmit({
                        ...loginData,
                        ...values,
                    })
                        .catch((error) => {
                            if (error.response.status === 401) {
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

export default memo(SuspiciousLoginForm);
