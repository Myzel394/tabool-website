import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Calendar from "pages/calendar/index";
import {
    ChangePasswordPage,
    ChangeScoosoCredentialsPage,
    ConfirmEmail,
    ConfirmPasswordReset,
    FillOutData,
    LoggedInDevicesPage,
    Login,
    Logout,
    MainPage as MainSettingsPage,
    Register,
    RequestPasswordToken,
    StartPage,
} from "pages";
import {generatePath} from "react-router";
import {useUser} from "hooks";

import agendaRoutes from "./agendaRoutes";
import addRoutes from "./addRoutes";


// TODO: Add formik search page!
export default function Routes() {
    const user = useUser();

    return (
        <Switch>
            {/* Forgot password */}
            <Route
                exact
                path="/auth/forgot-password/"
                component={RequestPasswordToken}
            />
            <Route
                exact
                path="/auth/forgot-password/confirm/"
                component={ConfirmPasswordReset}
            />
            {/* Authentication routes */}
            <Route
                exact
                path="/auth/registration/"
                component={Register}
            />
            <Route
                exact
                path="/auth/login/"
                component={Login}
            />
            <Route
                exact
                path="/auth/logout/"
                component={Logout}
            />
            {!user.isAuthenticated && <Redirect to={generatePath("/auth/login/")} />}
            {/* Registration routes */}
            <Route
                exact
                path="/auth/registration/email/:code?"
                component={ConfirmEmail}
                redirectUrl="/auth/login/"
            />
            <Route
                exact
                path="/auth/registration/fill"
                component={FillOutData}
                redirectUrl="/auth/login/"
            />
            {!user.isEmailVerified && <Redirect to={generatePath("/auth/registration/email/")} />}
            {!user.isFullyRegistered && <Redirect to={generatePath("/auth/registration/fill/")} />}
            {/* App routes */}
            {agendaRoutes}
            {addRoutes}
            <Route
                exact
                path="/"
                component={StartPage}
            />
            <Route
                exact
                path="/timetable/"
                component={Calendar}
            />
            <Route
                exact
                path="/settings/"
                component={MainSettingsPage}
            />
            <Route
                exact
                path="/settings/logged-in-devices/"
                component={LoggedInDevicesPage}
            />
            <Route
                exact
                path="/settings/change-password/"
                component={ChangePasswordPage}
            />
            <Route
                exact
                path="/settings/change-scooso-credentials/"
                component={ChangeScoosoCredentialsPage}
            />
        </Switch>
    );
}
