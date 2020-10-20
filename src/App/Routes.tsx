import React from "react";
import {Route, Switch} from "react-router-dom";

import Register from "../pages/auth/Register";
import EmailVerification from "../pages/auth/EmailVerification";


export default function Routes() {
    return (
        <Switch>
            <Route path="/auth/registration" exact component={Register} />
            <Route path="/auth/email-verification/:code" exact component={EmailVerification} />
            <Route path="/">
                <h1>Yeah</h1>
            </Route>
        </Switch>
    );
}
