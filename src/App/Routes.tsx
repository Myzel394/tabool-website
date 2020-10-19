import React from "react";
import {Switch, Route} from "react-router-dom";

import Register from "../pages/auth/Register";


export default function Routes() {
    return (
        <Switch>
            <Route path="/auth/registration/">
                <Register />
            </Route>
            <Route path="/">
                <h1>Yeah</h1>
            </Route>
        </Switch>
    );
}
