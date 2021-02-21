import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import {useUser} from "hooks";
import {LoadingPage} from "components";
import {useTranslation} from "react-i18next";
import {buildPath} from "utils";


// TODO: Add formik search page!
export default function Routes() {
    const {t} = useTranslation();
    const user = useUser();

    return (
        <Suspense fallback={<LoadingPage title={t("Seite wird geladen...")} />}>
            <Switch>
                <Route
                    exact
                    path={buildPath("/")}
                    component={lazy(() => import("pages/StartPage"))}
                />
                <Route
                    exact
                    path="/app/agenda/teacher/detail/:id/"
                    component={lazy(() => import("pages/detail/TeacherDetailPage"))}
                />
                <Route
                    exact
                    path={buildPath("/auth/login/")}
                    component={lazy(() => import("pages/auth/Login"))}
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
                {/* Agenda pages */}
                <Route
                    exact
                    path="/app/agenda/homework/detail/:id/"
                    component={lazy(() => import("pages/detail/HomeworkDetailPage"))}
                />
                <Route
                    exact
                    path="/app/agenda/exam/detail/:id/"
                    component={lazy(() => import("pages/detail/ExamDetailPage"))}
                />
                {/* Landing page }
                {!user.isAuthenticated &&
                <Route
                    exact
                    path={buildPath("/")}
                    component={lazy(() => import("pages.backup/LandingPage"))}
                />}
                {/* Forgot password }
                <Route
                    exact
                    path={buildPath("/auth/forgot-password/")}
                    component={lazy(() => import("pages.backup/forgotPassword/RequestPasswordToken"))}
                />
                <Route
                    exact
                    path={buildPath("/auth/forgot-password/confirm/")}
                    component={lazy(() => import("pages.backup/forgotPassword/ConfirmPasswordReset"))}
                />
                {/* Authentication routes }
                <Route
                    exact
                    path={buildPath("/auth/login/")}
                    component={lazy(() => import("pages.backup/auth/Login"))}
                />
                <Route
                    exact
                    path={buildPath("/auth/logout/")}
                    component={lazy(() => import("pages.backup/auth/Logout"))}
                />
                {!user.isAuthenticated && <Redirect to={buildPath("/")} />}
                {/* App routes }
                {agendaRoutes}
                {addRoutes}
                <Route
                    exact
                    path={buildPath("/")}
                    component={lazy(() => import("pages.backup/StartPage"))}
                />
                <Route
                    exact
                    path={buildPath("/timetable/")}
                    component={lazy(() => import("pages.backup/calendar"))}
                />
                <Route
                    exact
                    path={buildPath("/agenda/")}
                    component={lazy(() => import("pages.backup/agenda/AgendaPage"))}
                />
                <Route
                    exact
                    path={buildPath("/agenda/absence/")}
                    component={lazy(() => import("pages.backup/agenda/AbsenceList/index"))}
                />
                <Route
                    exact
                    path={buildPath("/agenda/files/")}
                    component={lazy(() => import("pages.backup/agenda/FileList/index"))}
                />
                {/* Settings page }
                <Route
                    exact
                    path={buildPath("/settings/")}
                    component={lazy(() => import("pages.backup/settingsPage/MainPage"))}
                />
                <Route
                    exact
                    path={buildPath("/settings/logged-in-devices/")}
                    component={lazy(() => import("pages.backup/settingsPage/LoggedInDevicesPage"))}
                />
                <Route
                    exact
                    path={buildPath("/settings/change-password/")}
                    component={lazy(() => import("pages.backup/settingsPage/ChangePasswordPage"))}
                />
                <Route
                    exact
                    path={buildPath("/settings/change-scooso-credentials/")}
                    component={lazy(() => import("pages.backup/settingsPage/ChangeScoosoCredentialsPage"))}
                />
                {*/}
            </Switch>
        </Suspense>
    );
}
