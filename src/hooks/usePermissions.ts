import {Dispatch, SetStateAction} from "react";

import usePersistentStorage from "./usePersistentStorage";

export interface Permissions {
    notification: PermissionType;
    location: PermissionType;
}

export interface IUsePermissions {
    state: Permissions;
    setState: Dispatch<SetStateAction<Permissions>>;
    check: {
        notification: () => Promise<PermissionType>;
        location: () => Promise<PermissionType | undefined>;
    };
    ask: {
        notification: () => Promise<PermissionType>;
        location: () => Promise<PermissionType>;
    };
    isLoading: boolean;
}

export enum PermissionType {
    NotGranted = "not_granted",
    Granted = "granted",
    NotAvailable = "not_available",
    Blocked = "blocked",
    Default = "default"
}

const hasNotificationGranted = async (): Promise<PermissionType> => {
    switch (Notification.permission) {
        case "default":
            return PermissionType.Default;
        case "denied":
            return PermissionType.Blocked;
        case "granted":
            return PermissionType.Granted;
    }
};

const hasLocationGranted = async (): Promise<PermissionType | undefined> => {
    if ("permissions" in navigator) {
        const {state} = await navigator.permissions.query({name: "geolocation"});

        switch (state) {
            case "denied":
                return PermissionType.Blocked;
            case "granted":
                return PermissionType.Granted;
        }

        return PermissionType.NotGranted;
    }
    return undefined;
};

const askNotification = () => new Promise<PermissionType>((resolve) => {
    const handleResult = result => {
        switch (result) {
            case "granted":
                resolve(PermissionType.Granted);
                break;
            case "denied":
                resolve(PermissionType.Blocked);
                break;
            default:
                resolve(PermissionType.Default);
        }
    };

    if ("Notification" in window) {
        // Notification doesn't throw an exception
        // eslint-disable-next-line promise/catch-or-return
        Notification
            .requestPermission(handleResult)
            .then(handleResult);
    } else {
        resolve(PermissionType.NotAvailable);
    }
});

const askLocation = () =>
    new Promise<PermissionType>((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(() => {
                resolve(PermissionType.Granted);
            }, error => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        resolve(PermissionType.Blocked);
                        break;
                    case error.TIMEOUT:
                    case error.POSITION_UNAVAILABLE:
                        resolve(PermissionType.Granted);
                }
            });
        } else {
            resolve(PermissionType.NotAvailable);
        }
    });

const defaultValue = {
    notification: PermissionType.Default,
    location: PermissionType.Default,
};

const usePermissions = (): IUsePermissions => {
    const [permStates, setPermStates] = usePersistentStorage<Permissions>(defaultValue, "permissions");

    return {
        state: permStates,
        setState: setPermStates,
        check: {
            notification: hasNotificationGranted,
            location: hasLocationGranted,
        },
        ask: {
            notification: askNotification,
            location: askLocation,
        },
        isLoading: status === "pending",
    };
};

export default usePermissions;
