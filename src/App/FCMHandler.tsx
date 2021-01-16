import React, {useEffect} from "react";
import {ISendFCMTokenData, useSendFCMTokenAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {usePermissions, usePersistentStorage} from "hooks";

import {message} from "../firebase";
import {PermissionType} from "../hooks/usePermissions";


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
        message.getToken({
            vapidKey: "BOr7IMa796K1HWTCRkZsW-fGh8wZvGPr9su0tJPjIAZnhxAnQrqQNu4NLNkIZPT4dxxoCByfPzX_34OnbEEgNmw",
        }).then(registrationId => {
            const hasAllowedNotifications = !isLoading && state.notification === PermissionType.Granted;

            if (!hasSent && hasAllowedNotifications) {
                mutate({
                    registrationId,
                });
            }
        });
    }, [mutate, hasSent, isLoading, state.notification]);

    return children;
};

export default FCMHandler;
