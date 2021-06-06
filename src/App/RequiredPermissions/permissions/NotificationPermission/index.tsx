import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setNotification as setStoreNotification} from "states";
import {useNotificationPrompt} from "hooks";

import RequestPermission from "../RequestPermission";
import PressOnAllow from "../PressOnAllow";
import {PermissionType} from "../../../../utils";

import notification from "./notification.svg";

const NotificationPermission = () => {
    const {t} = useTranslation();
    const promptUser = useNotificationPrompt();
    const dispatch = useDispatch();
    const setNotification = useCallback((perm: PermissionType) => dispatch(setStoreNotification(perm)), [dispatch]);

    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    return (
        <PressOnAllow show={isRequesting}>
            <RequestPermission
                title={t("Zugriff auf Benachrichtigungen?")}
                description={t("Damit du Benachrichtigungen bei Änderungen, Hausaufgaben, etc. erhälst, musst du den Zugriff auf Benachrichtigungen erteilen.")}
                svgLocation={notification}
                onGrant={() => {
                    setIsRequesting(true);
                    promptUser();
                }}
                onDismiss={() => setNotification(PermissionType.Denied)}
            />
        </PressOnAllow>
    );
};

export default NotificationPermission;
