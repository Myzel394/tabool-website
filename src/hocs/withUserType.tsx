import React, {FC, useContext} from "react";

import {UserType} from "../api";
import {UserContext} from "../contexts";

const withUserType = (studentComponent: FC, teacherComponent: FC) => props => {
    const {state: user, logout} = useContext(UserContext);

    if (!user.data?.userType) {
        logout();
        throw new Error("User has no userType");
    }

    const Component = {
        [UserType.Student]: studentComponent,
        [UserType.Teacher]: teacherComponent,
    }[user.data.userType];

    return <Component {...props} />;
};

export default withUserType;
