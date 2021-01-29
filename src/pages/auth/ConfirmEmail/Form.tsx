import React from "react";
import {IConfirmEmailData} from "hooks/apis";
import {LoadingOverlay, PrimaryButton} from "components";
import {Field, Form as IkForm, Formik, FormikConfig} from "formik";
import {useTranslation} from "react-i18next";
import {TextField} from "formik-material-ui";
import {Box, InputAdornment} from "@material-ui/core";
import * as yup from "yup";
import {MdVpnKey} from "react-icons/all";
import {Alert} from "@material-ui/lab";
import {ErrorFieldsInjection} from "types";
import {useColors} from "hooks";
import {useParams} from "react-router-dom";


export interface IForm {
    onSubmit: FormikConfig<IConfirmEmailData>["onSubmit"];
}


const Form = ({onSubmit}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {code} = useParams<{
        code: string;
    }>();
    const {t} = useTranslation();

    const validationSchema = yup.object({
        confirmationKey: yup
            .string()
            .min(40, t("Der Code ist 40 Zeichen lang."))
            .max(40, t("Der Code ist 40 Zeichen lang.")),
    });

    return (
        <Formik<IConfirmEmailData & ErrorFieldsInjection>
            initialValues={{
                confirmationKey: code,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Field
                                fullWidth
                                autoFocus
                                required
                                name="confirmationKey"
                                type="text"
                                component={TextField}
                                label={t("Code")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MdVpnKey color={inputIconColor} />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                            {errors.nonFieldErrors &&
                            <Alert severity="error">
                                {errors.nonFieldErrors}
                            </Alert>}
                        </Box>
                        <PrimaryButton type="submit">
                            {t("E-Mail bestätigen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
