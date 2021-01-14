import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {PermissionType} from "hooks/usePermissions";

import RequestPermission from "../RequestPermission";
import PressOnAllow from "../PressOnAllow";

import {notification} from "./svg";

export interface IRequestPermission {
    onDone: (hasGranted: PermissionType) => void;
}

const NotificationPermission = ({onDone}: IRequestPermission) => {
    const {t} = useTranslation();

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
                        .then(() => onDone(PermissionType.Granted))
                        .catch(() => onDone(PermissionType.NotGranted))
                        .finally(() => setIsRequesting(false));
                }}
                onDismiss={() => onDone(PermissionType.NotGranted)}
            />
        </PressOnAllow>
    );
};

export default NotificationPermission;
