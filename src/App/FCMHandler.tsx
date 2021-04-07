import React, {useEffect} from "react";
import {ISendFCMTokenData, useSendFCMTokenAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useOnFCMMessageHandler, usePermissions, usePersistentStorage} from "hooks";
import {PermissionType} from "hooks/usePermissions";

import firebase, {isSupported} from "../firebase";


export interface IFCMHandler {
    children: JSX.Element;
}

const FCMHandler = ({children}: IFCMHandler) => {
    const sendToken = useSendFCMTokenAPI();
    const {
        state,
        isLoading,
    } = usePermissions();

    const [hasSent, setHasSent] = usePersistentStorage<boolean>(false, "has_sent_fcm_token_to_server");

    const {
        mutate,
    } = useMutation<void, AxiosError, ISendFCMTokenData>(
        sendToken,
        {
            retry: 5,
            onSuccess: () => setHasSent(true),
        },
    );

    useEffect(() => {
        if (
            isSupported &&
            !isLoading &&
            state.notification === PermissionType.Granted &&
            !hasSent
        ) {
            firebase.messaging()
                .getToken({
                    vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
                })
                .then(registrationId => {
                    if (registrationId) {
                        mutate({
                            registrationId,
                        });
                    }
                })
                .catch(() => null);
        }
    }, [mutate, hasSent, isLoading, state.notification]);

    useOnFCMMessageHandler();

    return children;
};

export default FCMHandler;
