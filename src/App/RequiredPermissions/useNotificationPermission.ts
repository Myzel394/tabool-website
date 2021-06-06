import {useCallback, useEffect} from "react";
import {supportsNotifications} from "supports";
import {useDispatch} from "react-redux";
import {setNotification as setStoreNotification} from "states";
import {useAsync} from "hooks";
import {PermissionType} from "utils";
import {PERMISSION_STATUS_TYPE_MAP} from "mappings";

const getNotificationPermissionStatus = (): PermissionType | void => {
    if (!supportsNotifications) {
        return PermissionType.NotAvailable;
    }

    return PERMISSION_STATUS_TYPE_MAP[Notification.permission];
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
                setNotification(PERMISSION_STATUS_TYPE_MAP[this.state]);
            };

            permissionsStatus.addEventListener("change", updateNotification);

            return () => permissionsStatus.removeEventListener("change", updateNotification);
        }
    }, [permissionsStatus, setNotification]);
};

export default useNotificationPermission;
