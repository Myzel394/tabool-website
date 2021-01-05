import React from "react";
import {Field, Form as IkForm, Formik, FormikConfig} from "formik";
import {IFillOutDataData} from "hooks/apis";
import {HiddenTextField, LoadingOverlay, PrimaryButton, TeacherField} from "components";
import {Box, Grid, InputAdornment, MenuItem} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import {TextField} from "formik-material-ui";
import {MdEnhancedEncryption} from "react-icons/all";
import * as yup from "yup";
import {ErrorFieldsInjection} from "types";
import {useColors} from "hooks";


export interface IForm {
    onSubmit: FormikConfig<IFillOutDataData>["onSubmit"];
}

const AVAILABLE_CLASSES = [
    5, 6, 7, 8, 9, 10, 11, 12, 13,
];

const Form = ({onSubmit}: IForm) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();

    const validationSchema = yup.object({
        classNumber: yup.number().required(t("Die Klassenstufe wird benötigt.")),
        mainTeacher: yup.string().required(t("Der Klassenlehrer / Stufenlehrer wird benötigt.")),
        scoosoUsername: yup.string().required(t("Dein Scooso-Benutzername wird benötigt.")),
        scoosoPassword: yup.string().required(t("Dein Scooso-Passwort wird benötigt.")),
    });

    return (
        <Formik<IFillOutDataData & ErrorFieldsInjection>
            initialValues={{
                classNumber: 5,
                mainTeacher: "",
                scoosoPassword: "",
                scoosoUsername: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting, errors}) =>
                <LoadingOverlay isLoading={isSubmitting}>
                    <IkForm>
                        <Box mb={4}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        autoFocus
                                        required
                                        name="mainTeacher"
                                        type="text"
                                        component={TeacherField}
                                        label={t("Lehrer")}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        fullWidth
                                        required
                                        select
                                        name="classNumber"
                                        component={TextField}
                                        inputProps={{
                                            id: "classNumber",
                                        }}
                                        variant="outlined"
                                        label={t("Klassenstufe")}
                                    >
                                        {AVAILABLE_CLASSES.map(element =>
                                            <MenuItem key={`class_number_${element}`} value={element}>
                                                {element}
                                            </MenuItem>)}
                                    </Field>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        fullWidth
                                        required
                                        name="scoosoUsername"
                                        type="text"
                                        component={TextField}
                                        label={t("Scooso-Benutzername")}
                                        helperText={t("Dein Scooso-Benutzername wird verschlüsselt gespeichert")}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEnhancedEncryption color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        fullWidth
                                        required
                                        name="scoosoPassword"
                                        type="text"
                                        variant="outlined"
                                        component={HiddenTextField}
                                        label={t("Scooso-Passwort")}
                                        helperText={t("Dein Scooso-Passwort wird verschlüsselt gespeichert")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEnhancedEncryption color={inputIconColor} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {errors.nonFieldErrors &&
                                        <Alert severity="error">
                                            {errors.nonFieldErrors}
                                        </Alert>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                        <PrimaryButton type="submit">
                            {t("Registrierung abschließen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
