import {Route} from "react-router-dom";
import React from "react";
import {AddPage, ExamAddPage, HomeworkAddPage, RoomAddPage} from "pages";
import {buildPath} from "utils";

const addRoutes = [
    <Route
        key="add_route"
        exact
        path={buildPath("/add/")}
        component={AddPage}
    />,
    <Route
        key="add_homework_route"
        exact
        path={buildPath("/add/homework/")}
        component={HomeworkAddPage}
    />,
    <Route
        key="add_exam_route"
        exact
        path={buildPath("/add/exam/")}
        component={ExamAddPage}
    />,
    <Route
        key="add_room_route"
        exact
        path={buildPath("/add/room/")}
        component={RoomAddPage}
    />,
];

export default addRoutes;
