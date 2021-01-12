import React from "react";
import {useUser} from "hooks";

import PermissionsHandler from "./PermissionsHandler";

const RequiredPermissions = ({children}) => {
    const user = useUser();

    if (user.isFullyRegistered) {
        return (
            <PermissionsHandler>
                {children}
            </PermissionsHandler>
        );
    }

    return children;
};

export default RequiredPermissions;
