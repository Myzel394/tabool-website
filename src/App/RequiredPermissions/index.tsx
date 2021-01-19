import React from "react";

import PermissionsHandler from "./PermissionsHandler";

const RequiredPermissions = ({children}) => {
    return (
        <PermissionsHandler>
            {children}
        </PermissionsHandler>
    );
};

export default RequiredPermissions;
