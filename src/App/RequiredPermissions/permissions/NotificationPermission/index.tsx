import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setNotification as setStoreNotification} from "state";

import RequestPermission from "../RequestPermission";
import PressOnAllow from "../PressOnAllow";
import {PermissionType} from "../types";

import notification from "./notification.svg";

const NotificationPermission = () => {
    const {t} = useTranslation();
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
                    Notification.requestPermission()
                        .then(permType => {
                            switch (permType) {
                                case "granted":
                                    setNotification(PermissionType.Granted);
                                    break;
                                case "denied":
                                    setNotification(PermissionType.Blocked);
                                    break;
                                case "default":
                                    setNotification(PermissionType.Unknown);
                                    break;
                            }
                        })
                        .catch(() => setNotification(PermissionType.Blocked));
                }}
                onDismiss={() => setNotification(PermissionType.Denied)}
            />
        </PressOnAllow>
    );
};

export default NotificationPermission;
