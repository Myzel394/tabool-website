import React, {useContext} from "react";
import {Switch} from "react-router-dom";
import Register from "pages/auth/Register";
import EmailVerification from "pages/auth/EmailVerification";
import FillOutData from "pages/auth/FillOutData";
import {UserContext} from "contexts";
import SubjectList from "pages/list/Subject";

import Route from "./PrivateRoute";


export default function Routes() {
    const {state: user} = useContext(UserContext);
    const isUserRegistered = user.isAuthenticated && user.isEmailVerified && user.isFullyRegistered;

    return (
        <Switch>
            <Route
                exact
                authed
                path="/auth/registration"
                component={Register}
                redirectUrl="/"
            />
            <Route
                exact
                path="/auth/email-verification/:code"
                component={EmailVerification}
                authed={user.isAuthenticated}
                redirectUrl="/auth/registration/"
            />
            <Route
                exact
                path="/auth/full-registration"
                component={FillOutData}
                authed={user.isAuthenticated && user.isEmailVerified}
                redirectUrl="/auth/registration/"
            />
            <Route
                exact
                path="/subject/"
                authed={isUserRegistered}
                component={SubjectList}
            />
            <Route
                exact
                path="/"
                authed={isUserRegistered}
                component={Register}
            />
        </Switch>
    );
}
