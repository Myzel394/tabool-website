import React from "react";
import {useUser} from "hooks";
import {useSelector} from "react-redux";
import {RootState} from "states";

import {LocationPermission, NotificationPermission} from "./permissions";
import {PermissionType} from "./permissions/types";
import useLocationPermission from "./useLocationPermission";
import useNotificationPermission from "./useNotificationPermission";

const PermissionsHandler = ({children}) => {
    const location = useSelector<RootState>(store => store.permissions.location);
    const notification = useSelector<RootState>(store => store.permissions.notification);

    const user = useUser();
    const checkPermissions = user.isAuthenticated;

    useNotificationPermission();
    useLocationPermission();

    if (checkPermissions) {
        if (notification === PermissionType.Unknown) {
            return (
                <NotificationPermission />
            );
        }

        if (location === PermissionType.Unknown) {
            return (
                <LocationPermission />
            );
        }
    }

    return children;
};

export default PermissionsHandler;
