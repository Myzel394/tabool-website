import React, {FC} from "react";

import {useUser} from "../hooks";
import {UserType} from "../api";

const withUserType = (studentComponent: FC, teacherComponent: FC) => props => {
    const user = useUser();

    if (!user.data?.userType) {
        throw new Error("User has no userType.");
    }

    const Component = {
        [UserType.Student]: studentComponent,
        [UserType.Teacher]: teacherComponent,
    }[user.data.userType];

    return <Component {...props} />;
};

export default withUserType;
