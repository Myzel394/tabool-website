import React from "react";
import {IConfirmEmailData} from "hooks/apis";
import {LoadingOverlay, PrimaryButton} from "components";
import {Field, Form as IkForm, Formik, FormikConfig} from "formik";
import {useTranslation} from "react-i18next";
import {TextField} from "formik-material-ui";
import {Box, InputAdornment} from "@material-ui/core";
import * as yup from "yup";
import {MdLock} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {ErrorFieldsInjection} from "types";


export interface IForm {
    onSubmit: FormikConfig<IConfirmEmailData>["onSubmit"];
}


const Form = ({onSubmit}: IForm) => {
    const {t} = useTranslation();

    const validationSchema = yup.object({
        token: yup
            .string()
            .min(40, t("Der Code ist 40 Zeichen lang."))
            .max(40, t("Der Code ist 40 Zeichen lang.")),
    });

    return (
        <Formik<IConfirmEmailData & ErrorFieldsInjection>
            initialValues={{
                token: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Field
                                required
                                name="token"
                                type="text"
                                component={TextField}
                                label={t("Code")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MdLock />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {errors.nonFieldErrors &&
                                <Alert severity="error">
                                    {errors.nonFieldErrors}
                                </Alert>}
                        </Box>
                        <PrimaryButton>
                            {t("E-Mail bestätigen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
