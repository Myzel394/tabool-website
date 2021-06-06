import {useCallback, useEffect} from "react";
import {supportsNotifications} from "supports";
import {useDispatch} from "react-redux";
import {setNotification as setStoreNotification} from "state";
import {useAsync} from "hooks";

import {PermissionType} from "./permissions/types";

const getNotificationPermissionStatus = (): PermissionType | void => {
    if (!supportsNotifications) {
        return PermissionType.NotAvailable;
    }

    switch (Notification.permission) {
        case "granted":
            return PermissionType.Granted;
        case "denied":
            return PermissionType.Blocked;
        case "default":
            return PermissionType.Unknown;
    }
};

const useNotificationPermission = () => {
    const dispatch = useDispatch();
    const setNotification = useCallback((perm: PermissionType) => dispatch(setStoreNotification(perm)), [dispatch]);

    const getStatus = useCallback(async (): Promise<PermissionStatus | undefined> => {
        if (!navigator.permissions) {
            return;
        }

        return navigator.permissions.query({
            name: "notifications",
        });
    }, []);
    const {
        value: permissionsStatus,
    } = useAsync(getStatus);

    // Get initial state
    useEffect(() => {
        const perm = getNotificationPermissionStatus();

        if (perm) {
            setNotification(perm);
        }
    }, [setNotification]);

    // Update permission on change
    useEffect(() => {
        if (permissionsStatus) {
            // eslint-disable-next-line func-style
            const updateNotification = function(this: PermissionStatus) {
                switch (this.state) {
                    case "granted":
                        setNotification(PermissionType.Granted);
                        break;
                    case "denied":
                        setNotification(PermissionType.Blocked);
                        break;
                    case "prompt":
                        setNotification(PermissionType.Unknown);
                        break;
                }
            };

            permissionsStatus.addEventListener("change", updateNotification);

            return () => permissionsStatus.removeEventListener("change", updateNotification);
        }
    }, [permissionsStatus, setNotification]);
};

export default useNotificationPermission;
