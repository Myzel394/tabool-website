import React from "react";
import {Box} from "@material-ui/core";
import {LoadingOverlay, PrimaryButton} from "components";
import {Field, Form as IkForm, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {useUser} from "hooks";
import {IRequestPasswordResetData} from "hooks/apis";
import {FormikConfig} from "formik/dist/types";
import {ErrorFieldsInjection} from "types";
import {Alert} from "@material-ui/lab";
import {TextField} from "formik-material-ui";


export interface IForm {
    onSubmit: FormikConfig<IRequestPasswordResetData>["onSubmit"];
}


const Form = ({onSubmit}: IForm) => {
    const user = useUser();
    const {t} = useTranslation();

    return (
        <Formik<IRequestPasswordResetData & ErrorFieldsInjection>
            initialValues={{
                email: user.data?.email ?? "",
            }}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Field
                                fullWidth
                                required
                                type="email"
                                name="email"
                                label={t("E-Mail")}
                                component={TextField}
                                variant="outlined"
                            />
                            {errors.nonFieldErrors &&
                                <Alert severity="error">
                                    {errors.nonFieldErrors}
                                </Alert>}
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Zurücksetzen anfragen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
