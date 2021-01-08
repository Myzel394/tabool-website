import React, {useContext} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {UserContext} from "contexts";
import Calendar from "pages/calendar/index";
import {
    AddPage,
    ConfirmEmail,
    ExamAddPage,
    ExamDetailPage,
    FillOutData,
    HomeworkAddPage,
    HomeworkDetailPage,
    HomeworkListPage,
    LessonDetailPage,
    Login,
    Register,
    TeacherDetailPage,
} from "pages";


// TODO: Add formik search page!
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
            {!user.isAuthenticated && <Redirect to="/auth/login/" />}
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
            {!user.isEmailVerified && <Redirect to="/auth/registration/email/" />}
            {!user.isFullyRegistered && <Redirect to="/auth/registration/fill/" />}
            <Route
                exact
                path="/timetable/"
                component={Calendar}
            />
            <Route
                exact
                path="/agenda/homework/detail/:id/"
                component={HomeworkDetailPage}
            />
            <Route
                exact
                path="/agenda/lesson/detail/:id/"
                component={LessonDetailPage}
            />
            <Route
                exact
                path="/agenda/teacher/detail/:id/"
                component={TeacherDetailPage}
            />
            <Route
                exact
                path="/agenda/exam/detail/:id/"
                component={ExamDetailPage}
            />
            <Route
                exact
                path="/add/homework/"
                component={HomeworkAddPage}
            />
            <Route
                exact
                path="/add/"
                component={AddPage}
            />
            <Route
                exact
                path="/add/exam/"
                component={ExamAddPage}
            />
            <Route
                exact
                path="/agenda/homework/"
                component={HomeworkListPage}
            />
        </Switch>
    );
}
