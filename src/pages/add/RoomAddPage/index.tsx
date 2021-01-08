import React from "react";
import {useHistory} from "react-router-dom";
import {ISendRoomData, ISendRoomResponse, useSendRoomAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {useTranslation} from "react-i18next";
import {FocusedPage} from "components";

import Form from "./Form";


const RoomAddPage = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const sendRoom = useSendRoomAPI();
    const {addSuccess} = useSnackbar();

    const {
        mutateAsync,
    } = useMutation<ISendRoomResponse, AxiosError, ISendRoomData>(
        sendRoom,
        {
            onSuccess: () => {
                history.goBack();
                addSuccess(t("Ort hinzugefügt!"));
            },
        },
    );

    return (
        <FocusedPage title={t("Ort hinzufügen")}>
            <Form
                onSubmit={(values, {setSubmitting, setErrors}) =>
                    mutateAsync(values)
                        .catch(error => setErrors(error.response?.data))
                        .finally(() => setSubmitting(false))
                }
            />
        </FocusedPage>
    );
};

export default RoomAddPage;
