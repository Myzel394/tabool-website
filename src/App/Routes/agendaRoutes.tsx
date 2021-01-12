import {Route} from "react-router-dom";
import {ExamDetailPage, HomeworkDetailPage, LessonDetailPage, TeacherDetailPage} from "pages";
import React from "react";

const agendaRoutes = [
    <Route
        key="agenda_homework_route"
        exact
        path="/agenda/homework/detail/:id/"
        component={HomeworkDetailPage}
    />,
    <Route
        key="agenda_lesson_route"
        exact
        path="/agenda/lesson/detail/:id/"
        component={LessonDetailPage}
    />,
    <Route
        key="agenda_teacher_route"
        exact
        path="/agenda/teacher/detail/:id/"
        component={TeacherDetailPage}
    />,
    <Route
        key="agenda_exam_route"
        exact
        path="/agenda/exam/detail/:id/"
        component={ExamDetailPage}
    />,
];

export default agendaRoutes;
