import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Calendar from "pages/calendar/index";
import {
    AgendaPage,
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
import {useUser} from "hooks";

import {buildPath} from "../../utils";

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
                path={buildPath("/auth/forgot-password/")}
                component={RequestPasswordToken}
            />
            <Route
                exact
                path={buildPath("/auth/forgot-password/confirm/")}
                component={ConfirmPasswordReset}
            />
            {/* Authentication routes */}
            <Route
                exact
                path={buildPath("/auth/registration/")}
                component={Register}
            />
            <Route
                exact
                path={buildPath("/auth/login/")}
                component={Login}
            />
            <Route
                exact
                path={buildPath("/auth/logout/")}
                component={Logout}
            />
            {!user.isAuthenticated && <Redirect to={buildPath("/auth/login/")} />}
            {/* Registration routes */}
            <Route
                exact
                path="/app/auth/registration/email/:code?"
                component={ConfirmEmail}
                redirectUrl="/auth/login/"
            />
            <Route
                exact
                path="/app/auth/registration/fill"
                component={FillOutData}
                redirectUrl="/auth/login/"
            />
            {!user.isEmailVerified && <Redirect to={buildPath("/auth/registration/email/")} />}
            {!user.isFullyRegistered && <Redirect to={buildPath("/auth/registration/fill/")} />}
            {/* App routes */}
            {agendaRoutes}
            {addRoutes}
            <Route
                exact
                path={buildPath("/")}
                component={StartPage}
            />
            <Route
                exact
                path={buildPath("/timetable/")}
                component={Calendar}
            />
            <Route
                exact
                path={buildPath("/agenda/")}
                component={AgendaPage}
            />
            <Route
                exact
                path={buildPath("/settings/")}
                component={MainSettingsPage}
            />
            <Route
                exact
                path={buildPath("/settings/logged-in-devices/")}
                component={LoggedInDevicesPage}
            />
            <Route
                exact
                path={buildPath("/settings/change-password/")}
                component={ChangePasswordPage}
            />
            <Route
                exact
                path={buildPath("/settings/change-scooso-credentials/")}
                component={ChangeScoosoCredentialsPage}
            />
        </Switch>
    );
}
