import React from "react";
import {usePermissions} from "hooks";
import {PermissionType} from "hooks/usePermissions";

import {LocationPermission, NotificationPermission} from "./permissions";

const PermissionsHandler = ({children}) => {
    const {
        state: permStates,
        setState: setPermStates,
    } = usePermissions();

    const hasUndecidedPermissions = new Set(Object.values(permStates)).has(PermissionType.Default);

    if (hasUndecidedPermissions) {
        if (permStates.notification === PermissionType.Default) {
            return (
                <NotificationPermission
                    onDone={state =>
                        setPermStates({
                            ...permStates,
                            notification: state,
                        })}
                />
            );
        }
        if (permStates.location === PermissionType.Default) {
            return (
                <LocationPermission
                    onDone={state =>
                        setPermStates({
                            ...permStates,
                            location: state,
                        })
                    }
                />
            );
        }
    }

    return children;
};

export default PermissionsHandler;
