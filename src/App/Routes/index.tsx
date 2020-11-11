import React, {useContext} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "pages/auth/Register";
import EmailVerification from "pages/auth/EmailVerification";
import FillOutData from "pages/auth/FillOutData";
import {UserContext} from "contexts";
import SubjectList from "pages/list/Subject";
import Login from "pages/auth/Login";
import Home from "pages/home";
import Calendar from "pages/calendar/index";


export default function Routes() {
    const {state: user} = useContext(UserContext);

    return (
        <Switch>
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
            {!user.isAuthenticated && <Redirect to="/auth/login" />}
            <Route
                exact
                path="/auth/email-verification/:code?"
                component={EmailVerification}
                redirectUrl="/auth/login/"
            />
            {!user.isEmailVerified && <Redirect to="/auth/email-verification/" />}
            <Route
                exact
                path="/auth/full-registration"
                component={FillOutData}
                redirectUrl="/auth/login/"
            />
            {!user.isFullyRegistered && <Redirect to="/auth/full-registration/" />}
            <Route
                exact
                path="/subject/"
                component={SubjectList}
            />
            <Route
                exact
                path="/"
                component={Home}
            />
            <Route
                exact
                path="/calendar/"
                component={Calendar}
            />
        </Switch>
    );
}
