import React from "react";
import {IRegistrationData} from "hooks/apis";
import {Field, Form as IkForm, Formik, FormikConfig} from "formik";
import {Box, FormGroup, FormHelperText, Grid, InputAdornment, Link} from "@material-ui/core";
import {TextField} from "formik-material-ui";
import {MdEmail, MdVpnKey} from "react-icons/all";
import {Trans, useTranslation} from "react-i18next";
import * as yup from "yup";
import {LoadingOverlay, PrimaryButton} from "components";

import RequestTokenDialog from "./RequestTokenDialog";

export interface FormikForm extends IRegistrationData {
    passwordConfirmation: string;
}


export interface IForm {
    onSubmit: FormikConfig<IRegistrationData>["onSubmit"];
}


const Form = ({onSubmit}: IForm) => {
    const {t} = useTranslation();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email(t("Keine gültige E-Mail."))
            .required(t("Die E-Mail wird benötigt.")),
        token: yup
            .string()
            .min(128, t("Der Token ist zu kurz."))
            .max(128, t("Der Token ist zu kurz.")),
        password: yup
            .string()
            .min(8, t("Das Passwort muss mindestens 8 Zeichen lang sein."))
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t("Das Passwort muss einen Buchstaben und eine Zahl enthalten.")),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], t("DIe Passwörter stimmen nicht überein.")),
    });

    return (
        <Formik<FormikForm>
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
            {({errors, isSubmitting}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Field
                                        required
                                        name="email"
                                        type="email"
                                        label={t("E-Mail")}
                                        component={TextField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEmail />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <Field
                                            required
                                            name="token"
                                            type="text"
                                            label={t("Token")}
                                            component={TextField}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MdVpnKey />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <RequestTokenDialog />
                                    </FormGroup>
                                </Grid>
                                <Grid item md={6}>
                                    <FormGroup>
                                        <Field
                                            required
                                            name="password"
                                            type="password"
                                            label={t("Passwort")}
                                            component={TextField}
                                        />
                                        {!errors.password &&
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
                                    </FormGroup>
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        required
                                        name="passwordConfirmation"
                                        type="password"
                                        label={t("Passwort bestätigen")}
                                        component={TextField}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Registrieren")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
