import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setNotification as setStoreNotification} from "states";

import {PermissionType} from "../utils";
import {PERMISSION_STATUS_TYPE_MAP} from "../mappings";

const useNotificationPrompt = (): () => Promise<any> => {
    const dispatch = useDispatch();
    const setNotification = useCallback(
        (perm: PermissionType) => dispatch(setStoreNotification(perm)),
        [dispatch],
    );

    const promptUser = useCallback(async () => {
        try {
            const permType = await Notification.requestPermission();

            setNotification(PERMISSION_STATUS_TYPE_MAP[permType]);
        } catch (error) {
            setNotification(PermissionType.Blocked);

            throw error;
        }
    }, [setNotification]);

    return promptUser;
};

export default useNotificationPrompt;
