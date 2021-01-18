import {Route} from "react-router-dom";
import React, {lazy} from "react";
import {buildPath} from "utils";

const addRoutes = [
    <Route
        key="add_route"
        exact
        path={buildPath("/add/")}
        component={lazy(() => import("pages/AddPage"))}
    />,
    <Route
        key="add_homework_route"
        exact
        path={buildPath("/add/homework/")}
        component={lazy(() => import("pages/add/HomeworkAddPage"))}
    />,
    <Route
        key="add_exam_route"
        exact
        path={buildPath("/add/exam/")}
        component={lazy(() => import("pages/add/ExamAddPage"))}
    />,
    <Route
        key="add_room_route"
        exact
        path={buildPath("/add/room/")}
        component={lazy(() => import("pages/add/RoomAddPage"))}
    />,
];

export default addRoutes;
