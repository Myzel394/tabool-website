import React, {memo} from "react";
import {FormikConfig} from "formik/dist/types";
import {IConfirmPasswordResetData} from "hooks/apis";
import {Field, Form as IkForm, Formik} from "formik";
import {ErrorFieldsInjection} from "types";
import {HiddenTextField, LoadingOverlay, PrimaryButton} from "components";
import {Box, FormHelperText, Grid, InputAdornment} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useColors, useQueryString, useUser} from "hooks";
import {useTranslation} from "react-i18next";
import {MdEmail, MdLock, MdVpnKey} from "react-icons/all";
import {TextField} from "formik-material-ui";


export interface IForm {
    onSubmit: FormikConfig<IConfirmPasswordResetData>["onSubmit"];
}

const Form = ({onSubmit}: IForm) => {
    const {
        email: queryEmail,
        token,
    } = useQueryString({
        parseBooleans: false,
        parseNumbers: false,
    });
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();
    const user = useUser();

    return (
        <Formik<IConfirmPasswordResetData & ErrorFieldsInjection>
            initialValues={{
                email: typeof queryEmail === "string" ? queryEmail : (user.data?.email ?? ""),
                token: typeof token === "string" ? token : "",
                password: "",
            }}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Field
                                        fullWidth
                                        required
                                        type="text"
                                        name="token"
                                        variant="outlined"
                                        label={t("Token")}
                                        component={TextField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdVpnKey color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Field
                                        fullWidth
                                        required
                                        type="email"
                                        name="email"
                                        variant="outlined"
                                        label={t("E-Mail")}
                                        component={TextField}
                                        helperText={t("Zur Sicherheit wird nochmal nach deiner E-Mail gefragt.")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEmail color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Field
                                        fullWidth
                                        required
                                        type="text"
                                        name="password"
                                        variant="outlined"
                                        label={t("Passwort")}
                                        component={HiddenTextField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdLock color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    {errors.nonFieldErrors
                                        ? (
                                            <Alert severity="error">
                                                {errors.nonFieldErrors}
                                            </Alert>
                                        ) : (
                                            <FormHelperText>
                                                {t("Deine Anmeldedaten bleiben nicht erhalten. Du musst dich auf angemeldeten Geräten neu anmelden.")}
                                            </FormHelperText>
                                        )}
                                </Grid>
                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Passwort zurücksetzen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default memo(Form);
