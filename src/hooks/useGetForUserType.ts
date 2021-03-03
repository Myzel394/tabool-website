import {UserType} from "api";
import {useContext} from "react";

import {UserContext} from "../contexts";

const useGetForUserType = <S, T>(student: S, teacher: T): S | T => {
    const {state: user, logout} = useContext(UserContext);

    if (!user.data?.userType) {
        logout();
        throw new Error("User has no userType");
    }

    return {
        [UserType.Student]: student,
        [UserType.Teacher]: teacher,
    }[user.data.userType];
};

export default useGetForUserType;
