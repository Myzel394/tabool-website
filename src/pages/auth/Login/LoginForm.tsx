import React from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {Box, Grid, InputAdornment, Link, useTheme} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {useTranslation} from "react-i18next";
import {MdEmail, MdLock} from "react-icons/all";
import {LoadingOverlay, PrimaryButton, SecondaryButton} from "components";
import {generatePath} from "react-router-dom";
import {ILoginData, ILoginResponse} from "hooks/apis";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {ErrorFieldsInjection} from "types";


export interface ILoginPage {
    onSubmit: (form: ILoginData) => Promise<ILoginResponse>;
}

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const LoginForm = ({onSubmit}: ILoginPage) => {
    const theme = useTheme();
    const {t} = useTranslation();

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
                            setErrors(error.response?.data);
                        }
                    })
                    .finally(() => setSubmitting(false))
            }
        >
            {({isSubmitting, touched, errors}) => (
                <LoadingOverlay isLoading={isSubmitting}>
                    <Form>
                        <Box mb={4}>
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid item md={6}>
                                    <Field
                                        fullWidth
                                        required
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label={t("E-Mail")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEmail color={theme.palette.text.secondary} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        fullWidth
                                        required
                                        component={TextField}
                                        name="password"
                                        type="password"
                                        label={t("Passwort")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdLock color={theme.palette.text.secondary} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        helperText={touched.email && errors.password}
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
                        <Grid container spacing={1}>
                            <Grid item>
                                <PrimaryButton type="submit">
                                    {t("Anmelden")}
                                </PrimaryButton>
                            </Grid>
                            <Grid item>
                                <Link component={SecondaryButton} underline="none" href={generatePath("/auth/registration/")}>
                                    {t("Registrieren")}
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </LoadingOverlay>
            )}
        </Formik>
    );
};

export default LoginForm;
