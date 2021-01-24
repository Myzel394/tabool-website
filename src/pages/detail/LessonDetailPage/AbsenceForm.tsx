import React from "react";
import {IUpdateAbsenceData} from "hooks/apis";
import {Field, Form, Formik, FormikConfig} from "formik";
import {Absence} from "types";
import {Grid} from "@material-ui/core";
import {CheckboxWithLabel} from "formik-material-ui";
import {useTranslation} from "react-i18next";
import {AbsenceReasonField, LoadingOverlay} from "components";


export interface IAbsenceForm {
    onSubmit: FormikConfig<IUpdateAbsenceData>["onSubmit"];

    absence?: Absence;
}

const AbsenceForm = ({
    onSubmit,
    absence,
}: IAbsenceForm) => {
    const {t} = useTranslation();

    return (
        <Formik<IUpdateAbsenceData>
            enableReinitialize
            initialValues={{
                reason: absence?.reason ?? "",
                isSigned: absence?.isSigned ?? false,
            }}
            onSubmit={onSubmit}
        >
            {({isSubmitting, submitForm}) =>
                <Form>
                    <LoadingOverlay isLoading={isSubmitting}>
                        <Grid container spacing={2} alignItems="center" justify="center">
                            <Grid item xs={12} md={6}>
                                <Field
                                    type="text"
                                    name="reason"
                                    label={t("Grund")}
                                    component={AbsenceReasonField}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    name="isSigned"
                                    Label={{
                                        label: t("Unterschrieben"),
                                    }}
                                    component={CheckboxWithLabel}
                                    onChange={submitForm}
                                />
                            </Grid>
                        </Grid>
                    </LoadingOverlay>
                </Form>
            }
        </Formik>
    );
};
export default AbsenceForm;


