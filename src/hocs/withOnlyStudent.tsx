import React, {FC, useContext} from "react";

import {UserContext} from "../contexts";
import {UserType} from "../api";
import {ErrorPage} from "../components";


// eslint-disable-next-line react/display-name
const withOnlyTeacher = (component: FC) => props => {
    const {state: user, logout} = useContext(UserContext);

    if (!user.data?.userType) {
        logout();
        return null;
    }

    if (user.data.userType === UserType.Teacher) {
        return <ErrorPage status={403} />;
    }

    const Component = component;

    return <Component {...props} />;
};

export default withOnlyTeacher;
