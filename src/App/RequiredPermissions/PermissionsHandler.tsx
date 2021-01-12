import React, {useEffect} from "react";
import {usePersistentStorage} from "hooks";

import {LocationPermission, NotificationPermission} from "./permissions";
import PermissionType from "./permissionType";

interface Permissions {
    notification: PermissionType;
    location: PermissionType;
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

const PermissionsHandler = ({children}) => {
    const [permStates, setPermStates] = usePersistentStorage<Permissions>({
        notification: PermissionType.Default,
        location: PermissionType.Default,
    }, "_permissions");

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

    // Get permission states
    useEffect(() => {
        const handle = async () => {
            const [notification, location] = await Promise.all([hasNotificationGranted(), hasLocationGranted()]);

            setPermStates(prevState => ({
                ...prevState,
                notification,
                location: location ?? prevState.location,
            }));
        };

        handle();
    }, [setPermStates]);

    const hasUndecidedPermissions = new Set(Object.values(permStates)).has(PermissionType.Default);

    if (hasUndecidedPermissions) {
        if (permStates.notification === PermissionType.Default) {
            return (
                <NotificationPermission
                    onDone={hasGranted => setPermStates(prevState => ({
                        ...prevState,
                        notification: hasGranted,
                    }))}
                />
            );
        }
        if (permStates.location === PermissionType.Default) {
            return (
                <LocationPermission
                    onDone={hasGranted => setPermStates(prevState => ({
                        ...prevState,
                        location: hasGranted,
                    }))}
                />
            );
        }
    }

    return children;
};

export default PermissionsHandler;
