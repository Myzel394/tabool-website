import React from "react";
import {IRegistrationData} from "hooks/apis";
import {Field, Form as IkForm, Formik, FormikConfig} from "formik";
import {Box, FormControl, FormHelperText, Grid, InputAdornment, Link} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {MdEmail, MdVpnKey} from "react-icons/all";
import {Trans, useTranslation} from "react-i18next";
import * as yup from "yup";
import {HiddenTextField, LoadingOverlay, PrimaryButton, SecondaryButton} from "components";
import {Alert} from "@material-ui/lab";
import {ErrorFieldsInjection} from "types";
import {generatePath} from "react-router-dom";
import {useColors} from "hooks";

import RequestTokenDialog from "./RequestTokenDialog";

export interface FormikForm extends IRegistrationData {
    passwordConfirmation: string;
}


export interface IForm {
    onSubmit: FormikConfig<IRegistrationData>["onSubmit"];
}


const Form = ({onSubmit}: IForm) => {
    const {t} = useTranslation();
    const {
        inputIconColor,
    } = useColors();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email(t("Keine gültige E-Mail."))
            .required(t("Die E-Mail wird benötigt.")),
        token: yup
            .string()
            .min(127, t("Der Token ist zu kurz."))
            .max(127, t("Der Token ist zu lang.")),
        password: yup
            .string()
            .min(8, t("Das Passwort muss mindestens 8 Zeichen lang sein."))
            .matches(/^[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))$/, t("Das Passwort muss einen Buchstaben und eine Zahl enthalten."))
            .required("Das Passwort wird benötigt."),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], t("Die Passwörter stimmen nicht überein.")),
    });

    return (
        <Formik<FormikForm & ErrorFieldsInjection>
            initialValues={{
                email: "",
                password: "",
                passwordConfirmation: "",
                token: "",
            }}
            validationSchema={validationSchema}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore: Password confirmation isn't required
            onSubmit={onSubmit}
        >
            {({errors, isSubmitting, touched}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Grid container spacing={2} justify="center" alignItems="flex-start">
                                <Grid item xs={12}>
                                    <Field
                                        autoFocus
                                        fullWidth
                                        required
                                        name="email"
                                        type="email"
                                        label={t("E-Mail")}
                                        component={TextField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEmail color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Field
                                            fullWidth
                                            required
                                            name="token"
                                            type="text"
                                            label={t("Token")}
                                            component={TextField}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MdVpnKey color={inputIconColor} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="outlined"
                                        />
                                        <FormHelperText>
                                            <RequestTokenDialog />
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl>
                                        <Field
                                            fullWidth
                                            required
                                            name="password"
                                            type="text"
                                            label={t("Passwort")}
                                            component={HiddenTextField}
                                            variant="outlined"
                                        />
                                        {!(touched.password && errors.password) &&
                                            <FormHelperText>
                                                <Trans>
                                                    Wenn du Schwierigkeiten hast, dir starke Passwörter zu merken,
                                                    sie dir aufschreibst oder gar welche doppelt benutzt,
                                                    solltest du lieber einen Passwort-Manager wie{" "}
                                                    <Link
                                                        href="https://bitwarden.com/"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        Bitwarden
                                                    </Link>
                                                    {" "}oder{" "}
                                                    <Link
                                                        href="https://passwords.google.com/"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        Googles Passwort-Manager
                                                    </Link>
                                                    {" "}benutzen. Diese sind sicher, einfach zu benutzen und
                                                    viel viel besser als schlechte oder doppelte Passwörter.
                                                </Trans>
                                            </FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        required
                                        fullWidth
                                        name="passwordConfirmation"
                                        type="text"
                                        label={t("Passwort bestätigen")}
                                        component={HiddenTextField}
                                        variant="outlined"
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
                                    {t("Registrieren")}
                                </PrimaryButton>
                            </Grid>
                            <Grid item>
                                <Link component={SecondaryButton} underline="none" href={generatePath("/auth/login/")}>
                                    {t("Anmelden")}
                                </Link>
                            </Grid>
                        </Grid>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
