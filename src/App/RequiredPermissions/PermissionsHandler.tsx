import React from "react";
import {useUser} from "hooks";
import {useSelector} from "react-redux";
import {RootState} from "states";

import {PermissionType} from "../../utils";

import {LocationPermission, NotificationPermission} from "./permissions";
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
        if (notification === PermissionType.Ask) {
            return (
                <NotificationPermission />
            );
        }

        if (location === PermissionType.Ask) {
            return (
                <LocationPermission />
            );
        }
    }

    return children;
};

export default PermissionsHandler;
