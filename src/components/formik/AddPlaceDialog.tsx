import React, {memo} from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
} from "@material-ui/core";
import {Room} from "types";
import {useTranslation} from "react-i18next";
import {useMutation} from "react-query";
import {ISendRoomData, ISendRoomResponse, useSendRoomAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {TextField} from "formik-material-ui";

import {PrimaryButton, SecondaryButton} from "../buttons";
import {LoadingOverlay} from "../overlays";


export interface IAddPlaceDialog {
    initialValue: string;
    isOpen: boolean;
    onCreated: (room: Room) => any;
    onClose: () => any;
}

interface FormikForm {
    place: string;
}


const AddPlaceDialog = ({
    onClose,
    onCreated,
    isOpen,
    initialValue,
}: IAddPlaceDialog) => {
    const {t} = useTranslation();
    const sendRoom = useSendRoomAPI();

    const {
        mutateAsync,
    } = useMutation<ISendRoomResponse, AxiosError, ISendRoomData>(
        sendRoom,
    );

    const schema = yup.object({
        place: yup
            .string()
            .required()
            .matches(
                /^(([A-Z]{1,2}[0-9]?)|([0-9]){3})|([A-Z][A-Z ]{62})$/,
                t("Ungültiger Ortname. Benutze die Kurzform deines Orts."),
            ),
    });

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                {t("Ort hinzufügen")}
            </DialogTitle>
            <Formik<FormikForm>
                initialValues={{
                    place: initialValue,
                }}
                validationSchema={schema}
                onSubmit={(values, {setSubmitting, setErrors}) =>
                    mutateAsync(values)
                        .then(onCreated)
                        .catch(error => setErrors(error.response.data))
                        .finally(() => setSubmitting(true))
                }
            >
                {({isSubmitting, setFieldValue}) => (
                    <Form>
                        <DialogContent>
                            <DialogContentText>
                                <Box mb={2}>
                                    {t("Fehlt ein Ort? Füg ihn hinzu! Wir sind über jeden behobenen Fehler dankbar," +
                                        " aber Mist brauchen wir nicht und dies wird auch mit einer Sperrung des Accounts bestraft!")}
                                </Box>
                            </DialogContentText>
                            <LoadingOverlay isLoading={isSubmitting}>
                                <Form>
                                    <Field
                                        autoFocus
                                        component={TextField}
                                        name="place"
                                        label={t("Ortname")}
                                        type="text"
                                        variant="outlined"
                                        onChange={event => setFieldValue("place", event.target.value.toUpperCase())}
                                    />
                                </Form>
                            </LoadingOverlay>
                        </DialogContent>
                        <LoadingOverlay isLoading={isSubmitting}>
                            <DialogActions>
                                <PrimaryButton type="submit">
                                    {t("Ort hinzufügen")}
                                </PrimaryButton>
                                <SecondaryButton onClick={onClose}>
                                    {t("Abbruch")}
                                </SecondaryButton>
                            </DialogActions>
                        </LoadingOverlay>
                        {isSubmitting && <LinearProgress />}
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default memo(AddPlaceDialog);
