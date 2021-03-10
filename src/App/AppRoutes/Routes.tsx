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
                {/* Auth pages */}
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
                    path="/app/agenda/lesson/detail/:id/:date/"
                    component={lazy(() => import("pages/detail/LessonDetailPage"))}
                />
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

                <Route
                    exact
                    path="/app/agenda/files/"
                    component={lazy(() => import("pages/FileList"))}
                />
                {/* Add pages */}
                <Route
                    exact
                    path="/app/add/homework//"
                    component={lazy(() => import("pages/add/HomeworkAddPage"))}
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
