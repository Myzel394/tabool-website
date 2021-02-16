import React from "react";

import OhNoChecks from "../OhNoChecks";
import FCMHandler from "../FCMHandler";
import PollHandler from "../PollHandler";
import RequiredPermissions from "../RequiredPermissions";

import Routes from "./Routes";


const AppRoutes = () => {
    return (
        <OhNoChecks>
            <RequiredPermissions>
                <PollHandler>
                    <FCMHandler>
                        <Routes />
                    </FCMHandler>
                </PollHandler>
            </RequiredPermissions>
        </OhNoChecks>
    );
};

export default AppRoutes;
