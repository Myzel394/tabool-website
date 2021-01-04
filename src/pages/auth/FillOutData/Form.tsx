import React from "react";
import {ErrorMessage, Field, Form as IkForm, Formik, FormikConfig} from "formik";
import {IFillOutDataData} from "hooks/apis";
import {LoadingOverlay, PrimaryButton, TeacherField} from "components";
import {Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import {Select, TextField} from "formik-material-ui";
import {MdEnhancedEncryption} from "react-icons/all";
import * as yup from "yup";
import {ErrorFieldsInjection} from "types";


export interface IForm {
    onSubmit: FormikConfig<IFillOutDataData>["onSubmit"];
}

const AVAILABLE_CLASSES = [
    5, 6, 7, 8, 9, 10, 11, 12, 13,
];

const Form = ({onSubmit}: IForm) => {
    const {t} = useTranslation();

    const validationSchema = yup.object({
        classNumber: yup.number().required(),
        mainTeacher: yup.string().required(),
        scoosoUsername: yup.string().required(),
        scoosoPassword: yup.string().required(),
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
                                <Grid item md={6}>
                                    <Field
                                        required
                                        name="teacher"
                                        type="text"
                                        component={TeacherField}
                                        label={t("Lehrer")}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <FormControl>
                                        <InputLabel htmlFor="classNumber">
                                            {t("Klasse")}
                                        </InputLabel>
                                        <Field
                                            required
                                            name="classNumber"
                                            component={Select}
                                            inputProps={{
                                                id: "classNumber",
                                            }}
                                        >
                                            {AVAILABLE_CLASSES.map(element =>
                                                <MenuItem key={`class_number_${element}`} value={element}>
                                                    {element}
                                                </MenuItem>)}
                                        </Field>
                                        <Alert severity="error">
                                            <ErrorMessage name="classNumber" />
                                        </Alert>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        required
                                        name="scoosoUsername"
                                        type="text"
                                        component={TextField}
                                        label={t("Scooso-Benutzername")}
                                        helperText={t("Dein Scooso-Benutzername wird verschlüsselt gespeichert")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEnhancedEncryption />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Field
                                        required
                                        name="scoosoPassword"
                                        type="text"
                                        component={TextField}
                                        label={t("Scooso-Passwort")}
                                        helperText={t("Dein Scooso-Passwort wird verschlüsselt gespeichert")}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdEnhancedEncryption />
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
                        <PrimaryButton>
                            {t("Registrierung abschließen")}
                        </PrimaryButton>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default Form;
