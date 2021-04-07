import React, {useEffect} from "react";
import {ISendFCMTokenData, useSendFCMTokenAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useOnFCMMessageHandler, usePermissions, usePersistentStorage, useUser} from "hooks";
import {PermissionType} from "hooks/usePermissions";

import firebase, {isSupported} from "../firebase";
import {fcmKey} from "../constants/firebase";


export interface IFCMHandler {
    children: JSX.Element;
}

const FCMHandler = ({children}: IFCMHandler) => {
    const sendToken = useSendFCMTokenAPI();
    const {
        state,
        isLoading,
    } = usePermissions();
    const user = useUser();

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
            !hasSent &&
            user.isAuthenticated
        ) {
            firebase.messaging()
                .getToken({
                    vapidKey: fcmKey,
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
    }, [mutate, hasSent, isLoading, state.notification, user.isAuthenticated]);

    useOnFCMMessageHandler();

    return children;
};

export default FCMHandler;
