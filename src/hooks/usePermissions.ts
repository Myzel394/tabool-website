import {useCallback, useEffect} from "react";

import usePersistentStorage from "./usePersistentStorage";
import useAsync from "./useAsync";

export interface Permissions {
    notification: PermissionType;
    location: PermissionType;
}

export interface IUsePermissions {
    state: Permissions;
    setState: (newState: Permissions) => void;
    check: {
        notification: () => Promise<PermissionType>;
        location: () => Promise<PermissionType | undefined>;
    };
    isLoading: boolean;
}

export enum PermissionType {
    NotGranted = "not_granted",
    Granted = "granted",
    Default = "default",
    NotAvailable = "not_available"
}

const hasNotificationGranted = async (): Promise<PermissionType> => {
    switch (Notification.permission) {
        case "denied":
            return PermissionType.NotGranted;
        case "granted":
            return PermissionType.Granted;
        case "default":
            return PermissionType.Default;
    }
};

const hasLocationGranted = async (): Promise<PermissionType | undefined> => {
    if ("permissions" in navigator) {
        const {state} = await navigator.permissions.query({name: "geolocation"});

        switch (state) {
            case "denied":
                return PermissionType.NotGranted;
            case "granted":
                return PermissionType.Granted;
        }

        return PermissionType.Default;
    }
    return undefined;
};

const usePermissions = (): IUsePermissions => {
    const [permStates, setPermStates] = usePersistentStorage<Permissions>({
        notification: PermissionType.Default,
        location: PermissionType.Default,
    }, "_permissions");

    const checkPermissionStates = useCallback(async () => {
        const [notification, location] = await Promise.all([hasNotificationGranted(), hasLocationGranted()]);

        setPermStates(prevState => ({
            ...prevState,
            notification,
            location: location ?? prevState.location,
        }));
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
        isLoading: status === "pending",
    };
};

export default usePermissions;
