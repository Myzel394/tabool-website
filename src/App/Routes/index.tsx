import React, {lazy, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useUser} from "hooks";
import {buildPath} from "utils";

import agendaRoutes from "./agendaRoutes";
import addRoutes from "./addRoutes";
import Loading from "./Loading";


// TODO: Add formik search page!
export default function Routes() {
    const user = useUser();

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                {/* Forgot password */}
                <Route
                    exact
                    path={buildPath("/auth/forgot-password/")}
                    component={lazy(() => import("pages/forgotPassword/RequestPasswordToken"))}
                />
                <Route
                    exact
                    path={buildPath("/auth/forgot-password/confirm/")}
                    component={lazy(() => import("pages/forgotPassword/ConfirmPasswordReset"))}
                />
                {/* Authentication routes */}
                <Route
                    exact
                    path={buildPath("/auth/registration/")}
                    component={lazy(() => import("pages/auth/Register"))}
                />
                <Route
                    exact
                    path={buildPath("/auth/login/")}
                    component={lazy(() => import("pages/auth/Login"))}
                />
                <Route
                    exact
                    path={buildPath("/auth/logout/")}
                    component={lazy(() => import("pages/auth/Logout"))}
                />
                {!user.isAuthenticated && <Redirect to={buildPath("/auth/login/")} />}
                {/* Registration routes */}
                <Route
                    exact
                    path="/app/auth/registration/email/:code?"
                    component={lazy(() => import("pages/auth/ConfirmEmail"))}
                />
                <Route
                    exact
                    path="/app/auth/registration/fill"
                    component={lazy(() => import("pages/auth/FillOutData"))}
                />
                {!user.isEmailVerified && <Redirect to={buildPath("/auth/registration/email/")} />}
                {!user.isFullyRegistered && <Redirect to={buildPath("/auth/registration/fill/")} />}
                {/* App routes */}
                {agendaRoutes}
                {addRoutes}
                <Route
                    exact
                    path={buildPath("/")}
                    component={lazy(() => import("pages/StartPage"))}
                />
                <Route
                    exact
                    path={buildPath("/timetable/")}
                    component={lazy(() => import("pages/calendar"))}
                />
                <Route
                    exact
                    path={buildPath("/agenda/")}
                    component={lazy(() => import("pages/AgendaPage"))}
                />
                {/* Settings page */}
                <Route
                    exact
                    path={buildPath("/settings/")}
                    component={lazy(() => import("pages/settingsPage/MainPage"))}
                />
                <Route
                    exact
                    path={buildPath("/settings/logged-in-devices/")}
                    component={lazy(() => import("pages/settingsPage/LoggedInDevicesPage"))}
                />
                <Route
                    exact
                    path={buildPath("/settings/change-password/")}
                    component={lazy(() => import("pages/settingsPage/ChangePasswordPage"))}
                />
                <Route
                    exact
                    path={buildPath("/settings/change-scooso-credentials/")}
                    component={lazy(() => import("pages/settingsPage/ChangeScoosoCredentialsPage"))}
                />
            </Switch>
        </Suspense>
    );
}
