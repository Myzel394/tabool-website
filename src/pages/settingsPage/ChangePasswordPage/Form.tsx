import React, {memo} from "react";
import {Field, Form as IkForm, Formik} from "formik";
import {Box, FormHelperText, Grid, InputAdornment, Link} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {HiddenTextField, PrimaryButton, SecondaryButton} from "components";
import * as yup from "yup";
import {ErrorFieldsInjection} from "types";
import {useTranslation} from "react-i18next";
import {IChangePasswordData} from "hooks/apis";
import {FormikHelpers} from "formik/dist/types";
import {MdLock, MdLockOpen} from "react-icons/all";
import {useColors} from "hooks";

import {buildPath} from "../../../utils";


type FormikForm = ErrorFieldsInjection & IChangePasswordData & {
    newPasswordConfirm: string;
};

export interface IForm {
    onSubmit: (values: FormikForm, helpers: FormikHelpers<FormikForm>) => Promise<any>;
}

const Form = ({onSubmit}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();

    const validationSchema = yup.object({
        oldPassword: yup
            .string()
            .required(t("Das Passwort wird benötigt.")),
        newPassword: yup
            .string()
            .min(8, t("Das Passwort muss mindestens 8 Zeichen lang sein."))
            .matches(/^[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))$/, t("Das Passwort muss einen Buchstaben und eine Zahl enthalten."))
            .required("Das Passwort wird benötigt."),
        newPasswordConfirm: yup
            .string()
            .oneOf([yup.ref("newPassword"), null], t("Die Passwörter stimmen nicht überein.")),
    });

    return (
        <Formik<FormikForm>
            initialValues={{
                oldPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({errors}) =>
                <IkForm>
                    <Box mb={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    fullWidth
                                    component={HiddenTextField}
                                    name="oldPassword"
                                    variant="outlined"
                                    label={t("Altes Passwort")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdLockOpen color={inputIconColor} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    required
                                    fullWidth
                                    component={HiddenTextField}
                                    name="newPassword"
                                    variant="outlined"
                                    label={t("Neues Passwort")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdLock color={inputIconColor} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    required
                                    fullWidth
                                    component={HiddenTextField}
                                    name="newPasswordConfirm"
                                    variant="outlined"
                                    label={t("Neues Passwort bestätigt")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdLock color={inputIconColor} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {errors.nonFieldErrors
                                    ? (
                                        <Alert severity="error">
                                            {errors.nonFieldErrors}
                                        </Alert>
                                    )
                                    : (
                                        <FormHelperText>
                                            {t("Deine Anmeldedaten bleiben erhalten, du musst dich nicht neu anmelden (dies gilt auch für andere Geräte).")}
                                        </FormHelperText>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={12} md={6}>
                            <PrimaryButton type="submit">
                                {t("Passwort ändern")}
                            </PrimaryButton>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Link
                                component={SecondaryButton}
                                underline="none"
                                href={buildPath("/auth/forgot-password/")}
                            >
                                {t("Passwort vergessen")}
                            </Link>
                        </Grid>
                    </Grid>
                </IkForm>
            }
        </Formik>
    );
};

export default memo(Form);
