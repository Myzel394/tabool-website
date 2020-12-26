import React, {useContext} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "pages/auth/Register";
import EmailVerification from "pages/auth/EmailVerification";
import FillOutData from "pages/auth/FillOutData";
import {UserContext} from "contexts";
import Login from "pages/auth/Login";
import Calendar from "pages/calendar/index";
import {HomeworkAddPage, HomeworkDetailPage, HomeworkListPage, LessonDetailPage, TeacherDetailPage} from "pages";


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
            <Route
                exact
                path="/auth/email-verification/:code?"
                component={EmailVerification}
                redirectUrl="/auth/login/"
            />
            <Route
                exact
                path="/auth/full-registration"
                component={FillOutData}
                redirectUrl="/auth/login/"
            />
            {!user.isAuthenticated && <Redirect to="/auth/login" />}
            {!user.isEmailVerified && <Redirect to="/auth/email-verification/" />}
            {!user.isFullyRegistered && <Redirect to="/auth/full-registration/" />}
            <Route
                exact
                path="/timetable/"
                component={Calendar}
            />
            <Route
                exact
                path="/homework/detail/:id/"
                component={HomeworkDetailPage}
            />
            <Route
                exact
                path="/lesson/detail/:id/"
                component={LessonDetailPage}
            />
            <Route
                exact
                path="/teacher/detail/:id/"
                component={TeacherDetailPage}
            />
            <Route
                exact
                path="/homework/add/"
                component={HomeworkAddPage}
            />
            <Route
                exact
                path="/homework/"
                component={HomeworkListPage}
            />
        </Switch>
    );
}
