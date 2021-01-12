import {Route} from "react-router-dom";
import React from "react";

import {AddPage, ExamAddPage, HomeworkAddPage, RoomAddPage} from "../../pages";

const addRoutes = [
    <Route
        key="add_route"
        exact
        path="/add/"
        component={AddPage}
    />,
    <Route
        key="add_homework_route"
        exact
        path="/add/homework/"
        component={HomeworkAddPage}
    />,
    <Route
        key="add_exam_route"
        exact
        path="/add/exam/"
        component={ExamAddPage}
    />,
    <Route
        key="add_room_route"
        exact
        path="/add/room/"
        component={RoomAddPage}
    />,
];

export default addRoutes;
