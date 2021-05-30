import React, {useContext, useState} from "react";
import {Field, Form as IkForm, Formik} from "formik";
import {ModificationType} from "api";
import {ICreateTeacherModificationData, useCreateTeacherModificationAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {ErrorFieldsInjection, Subject, TeacherCourseDetail, TeacherModificationDetail} from "types";
import {AxiosError} from "axios";
import update from "immutability-helper";
import {Box, FormControl, Grid, InputLabel, MenuItem} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {MdAdd} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {
    LoadingOverlay,
    PlaceField,
    PrimaryButton,
    SingleModification,
    TeacherCourseField,
    TeacherField,
} from "components";
import {Select, TextField} from "formik-material-ui";
import _ from "lodash";

import {useDeviceWidth} from "../../../../../../hooks";
import RelatedObjectsContext from "../RelatedObjectsContext";

export interface AddModificationProps {
    onAdd: () => any;
}

interface FormikForm extends ErrorFieldsInjection {
    newRoom?: string | null;
    newSubject?: string | null;
    newTeacher?: string | null;
    information?: string;
    modificationType: ModificationType;
}

const AddModification = ({
    onAdd,
}: AddModificationProps) => {
    const {t} = useTranslation();
    const {
        lesson,
        lessonDate,
        updateLesson,
    } = useContext(RelatedObjectsContext);
    const addModification = useCreateTeacherModificationAPI();
    const {isMD} = useDeviceWidth();

    const [subject, setSubject] = useState<Subject>();

    const {
        mutateAsync,
        isLoading,
    } = useMutation<TeacherModificationDetail, AxiosError, Omit<ICreateTeacherModificationData, "lessonDate" | "lessonId">>(
        values => addModification({
            ...values,
            lessonDate,
            lessonId: lesson.id,
        }),
        {
            onSuccess: newModification => {
                updateLesson(prevState => update(prevState, {
                    modifications: {
                        $push: [
                            newModification,
                        ],
                    },
                }));
                onAdd();
            },
        },
    );

    return (
        <Formik<FormikForm>
            initialValues={{
                modificationType: ModificationType.FreePeriod,
            }}
            onSubmit={async (values, {setErrors, setSubmitting, resetForm}) => {
                const copiedValues = _.cloneDeep(values);

                if (values.modificationType === ModificationType.FreePeriod) {
                    copiedValues.newSubject = undefined;
                    copiedValues.newTeacher = undefined;
                    copiedValues.newRoom = undefined;
                } else if (values.modificationType === ModificationType.RoomChange) {
                    copiedValues.newSubject = undefined;
                    copiedValues.newTeacher = undefined;
                }

                try {
                    await mutateAsync(values);
                } catch (error) {
                    setErrors(error.response.data);
                } finally {
                    setSubmitting(false);
                    resetForm();
                }
            }}
        >
            {({errors, values, isSubmitting}) =>
                <LoadingOverlay isLoading={isLoading}>
                    <IkForm>
                        <Box my={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl
                                        required
                                        fullWidth={!isMD}
                                        variant="outlined"
                                    >
                                        <InputLabel>
                                            {t("Art der Veränderung")}
                                        </InputLabel>
                                        <Field
                                            fullWidth
                                            required
                                            defaultValue={ModificationType.FreePeriod}
                                            component={Select}
                                            type="radio"
                                            name="modificationType"
                                            label={t("Art der Veränderung*")}
                                        >
                                            <MenuItem value={ModificationType.Replacement}>
                                                {t("Vertretung")}
                                            </MenuItem>
                                            <MenuItem value={ModificationType.FreePeriod}>
                                                {t("Freistunde")}
                                            </MenuItem>
                                            <MenuItem value={ModificationType.SelfLearn}>
                                                {t("Selbstorganisiertes Lernen")}
                                            </MenuItem>
                                            <MenuItem value={ModificationType.RoomChange}>
                                                {t("Raumänderung")}
                                            </MenuItem>
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth={!isMD}
                                        disabled={[ModificationType.RoomChange, ModificationType.FreePeriod].includes(values.modificationType)}
                                        name="newSubject"
                                        label={t("Neues Fach")}
                                        component={TeacherCourseField}
                                        onChange={(id, course: TeacherCourseDetail) => setSubject(course.subject)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth={!isMD}
                                        disabled={[ModificationType.RoomChange, ModificationType.FreePeriod].includes(values.modificationType)}
                                        name="newTeacher"
                                        label={t("Neuer Lehrer")}
                                        component={TeacherField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth={!isMD}
                                        disabled={[ModificationType.FreePeriod].includes(values.modificationType)}
                                        name="newRoom"
                                        label={t("Neuer Raum")}
                                        component={PlaceField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        multiline
                                        variant="outlined"
                                        fullWidth={!isMD}
                                        name="information"
                                        label={t("Informationen")}
                                        component={TextField}
                                    />
                                </Grid>
                                {errors.nonFieldErrors && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            {errors.nonFieldErrors}
                                        </Alert>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                        <Box mb={2}>
                            <SingleModification
                                subject={lesson.course.subject}
                                newSubject={subject}
                                modificationType={values.modificationType}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <PrimaryButton size="large" type="submit" disabled={isSubmitting} startIcon={<MdAdd />}>
                                {t("Veränderung hinzufügen")}
                            </PrimaryButton>
                        </Box>
                    </IkForm>
                </LoadingOverlay>
            }
        </Formik>
    );
};

export default AddModification;
