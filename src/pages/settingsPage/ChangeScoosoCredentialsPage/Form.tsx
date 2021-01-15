import React from "react";
import {IUpdateScoosoCredentialsData} from "hooks/apis";
import {FormikHelpers} from "formik/dist/types";
import {Field, Form as IkForm, Formik} from "formik";
import {Box, Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {HiddenTextField, LoadingOverlay, PrimaryButton} from "components";
import {ErrorFieldsInjection} from "types";
import {Alert} from "@material-ui/lab";


export interface IForm {
    onSubmit: (values: IUpdateScoosoCredentialsData, helpers: FormikHelpers<IUpdateScoosoCredentialsData>) => Promise<void>;

    username?: string;
}


const Form = ({
    onSubmit,
    username,
}: IForm) => {
    const {t} = useTranslation();

    const validationSchema = yup.object({
        username: yup
            .string()
            .required("Der Scooso-Benutzername wird benötigt."),
        password: yup
            .string()
            .required("Das Scooso-Passwort wird benötigt."),
    });

    return (
        <Formik<IUpdateScoosoCredentialsData & ErrorFieldsInjection>
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
                username: username ?? "",
                password: "",
            }}
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
                                        name="username"
                                        component={HiddenTextField}
                                        label={t("Benutzername")}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                    <Field
                                        required
                                        name="password"
                                        component={HiddenTextField}
                                        label={t("Passwort")}
                                        variant="outlined"
                                    />
                                </Grid>
                                {errors.nonFieldErrors &&
                                <Alert severity="error">
                                    {errors.nonFieldErrors}
                                </Alert>}
                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Daten updaten")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
