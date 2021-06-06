import {fcmKey} from "constants/firebase";

import {useEffect} from "react";
import {ISendFCMTokenData, useSendFCMTokenAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useOnFCMMessageHandler, usePersistentStorage, useUser} from "hooks";
import {useSelector} from "react-redux";
import {RootState} from "state";

import firebase, {isSupported} from "../firebase";

// eslint-disable-next-line @shopify/strict-component-boundaries
import {PermissionType} from "./RequiredPermissions/permissions/types";


export interface FCMHandlerProps {
    children: JSX.Element;
}

const FCMHandler = ({children}: FCMHandlerProps) => {
    const sendToken = useSendFCMTokenAPI();
    const notification = useSelector<RootState>(store => store.permissions.notification) as PermissionType;
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
            notification === PermissionType.Granted &&
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
    }, [mutate, hasSent, notification, user.isAuthenticated]);

    useOnFCMMessageHandler();

    return children;
};

export default FCMHandler;
