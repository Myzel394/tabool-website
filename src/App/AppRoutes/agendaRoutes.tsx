import {Route} from "react-router-dom";
import React, {lazy} from "react";

const agendaRoutes = [
    <Route
        key="agenda_homework_route"
        exact
        path="/app/agenda/homework/detail/:id/"
        component={lazy(() => import("pages/detail/HomeworkDetailPage"))}
    />,
    <Route
        key="agenda_lesson_route"
        exact
        path="/app/agenda/lesson/detail/:id/"
        component={lazy(() => import("pages/detail/LessonDetailPage"))}
    />,
    <Route
        key="agenda_teacher_route"
        exact
        path="/app/agenda/teacher/detail/:id/"
        component={lazy(() => import("pages/detail/TeacherDetailPage"))}
    />,
    <Route
        key="agenda_exam_route"
        exact
        path="/app/agenda/exam/detail/:id/"
        component={lazy(() => import("pages/detail/ExamDetailPage"))}
    />,
];

export default agendaRoutes;
