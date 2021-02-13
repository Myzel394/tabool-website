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
                <FCMHandler>
                    <PollHandler>
                        <Routes />
                    </PollHandler>
                </FCMHandler>
            </RequiredPermissions>
        </OhNoChecks>
    );
};

export default AppRoutes;
