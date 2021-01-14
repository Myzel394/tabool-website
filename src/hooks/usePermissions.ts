import {Dispatch, SetStateAction, useCallback, useEffect} from "react";

import usePersistentStorage from "./usePersistentStorage";
import useAsync from "./useAsync";

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
            return PermissionType.NotGranted;
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
        Notification.requestPermission(handleResult)
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

    const checkPermissionStates = useCallback(async () => {
        const [notification, location] = await Promise.all([hasNotificationGranted(), hasLocationGranted()]);

        setPermStates(prevState => {
            const newState = {...prevState};

            if (prevState.notification !== PermissionType.Default) {
                newState.notification = notification;
            }

            if (prevState.location !== PermissionType.Default) {
                newState.location = location ?? prevState.location;
            }

            return newState;
        });
    }, [setPermStates]);

    // Get permission states
    const {
        status,
    } = useAsync(checkPermissionStates);

    // Check availability of permissions
    useEffect(() => {
        setPermStates(prevState => {
            const newState = {...prevState};

            if (!("Notification" in navigator)) {
                newState.notification = PermissionType.NotAvailable;
            }

            if (!("geolocation" in navigator)) {
                newState.location = PermissionType.NotAvailable;
            }

            return newState;
        });
    }, [setPermStates]);

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
