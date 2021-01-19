import React from "react";
import {useUser} from "hooks";

import OhNoChecks from "../OhNoChecks";
import FCMHandler from "../FCMHandler";
import PollHandler from "../PollHandler";
import RequiredPermissions from "../RequiredPermissions";

import Routes from "./Routes";


const AppRoutes = () => {
    const user = useUser();

    if (user.isFullyRegistered) {
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
    }

    return (
        <Routes />
    );
};

export default AppRoutes;
