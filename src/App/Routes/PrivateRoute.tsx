import React, {ComponentType} from "react";
import {Redirect, Route} from "react-router-dom";
import {RouteComponentProps, RouteProps} from "react-router";

export interface IPrivateRoute extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    authed: boolean;
    redirectUrl?: string;
}

const PrivateRoute = ({
    component: Component,
    authed,
    redirectUrl,
    ...other
}: IPrivateRoute) => {
    return (
        <Route
            {...other}
            render={props => {
                if (authed) {
                    return <Component {...props} />;
                }
                return <Redirect
                    to={{
                        pathname: redirectUrl,
                        state: {
                            from: props.location,
                        },
                    }} />;
            }}
        />
    );
};

PrivateRoute.defaultProps = {
    redirectUrl: "/auth/login/",
};

export default PrivateRoute;
