import React from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {Box, Grid, InputAdornment} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {useTranslation} from "react-i18next";
import {MdEmail, MdLock} from "react-icons/all";
import {HiddenTextField, LoadingOverlay, PrimaryButton} from "components";
import {ILoginData, ILoginResponse} from "hooks/apis";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {ErrorFieldsInjection} from "types";
import {useColors} from "hooks";


export interface ILoginPage {
    onSubmit: (form: ILoginData) => Promise<ILoginResponse>;
}

const LoginForm = ({onSubmit}: ILoginPage) => {
    const {t} = useTranslation();
    const {
        inputIconColor,
    } = useColors();

    const schema = yup.object({
        email: yup
            .string()
            .email(t("Das ist keine gültige E-Mail."))
            .required(t("Die E-Mail wird benötigt.")),
        password: yup
            .string()
            .required(t("Das Passwort wird benötigt.")),
    });

    return (
        <Formik<ILoginData & ErrorFieldsInjection>
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={schema}
            onSubmit={(values, {setErrors, setSubmitting}) =>
                onSubmit(values)
                    .catch((error: AxiosError) => {
                        if (error.response?.status === 400) {
                            setErrors(error.response?.data ?? {});
                        }
                        setSubmitting(false);
                    })
            }
        >
            {({isSubmitting, touched, errors}) => (
                <LoadingOverlay isLoading={isSubmitting}>
                    <Form>
                        <Box mb={4}>
                            <Grid container spacing={2} justify="center" alignItems="flex-start">
                                <Grid item md={6} xs={12}>
                                    <Field
                                        autoFocus
                                        fullWidth
                                        required
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        inputMode="email"
                                        label={t("E-Mail")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEmail color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        fullWidth
                                        required
                                        component={HiddenTextField}
                                        name="password"
                                        type="text"
                                        label={t("Passwort")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdLock color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {errors.nonFieldErrors &&
                                    <Alert severity="error">
                                        {errors.nonFieldErrors}
                                    </Alert>}
                                </Grid>
                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Anmelden")}
                        </PrimaryButton>
                    </Form>
                </LoadingOverlay>
            )}
        </Formik>
    );
};

export default LoginForm;
