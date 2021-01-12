import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Calendar from "pages/calendar/index";
import {ConfirmEmail, FillOutData, Login, Register, StartPage} from "pages";
import {generatePath} from "react-router";
import {useUser} from "hooks";

import agendaRoutes from "./agendaRoutes";
import addRoutes from "./addRoutes";


// TODO: Add formik search page!
export default function Routes() {
    const user = useUser();

    return (
        <Switch>
            {/* Authentication routes */}
            <Route
                exact
                path="/auth/registration"
                component={Register}
                redirectUrl="/"
            />
            <Route
                exact
                path="/auth/login"
                component={Login}
                redirectUrl="/"
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
        </Switch>
    );
}
