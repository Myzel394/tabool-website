import {UserType} from "api";
import {useContext} from "react";

import {UserContext} from "../contexts";

const useGetForUserType = <S, T>(student: S, teacher: T): S | T => {
    const {state: user, logout} = useContext(UserContext);

    if (!user.data?.userType) {
        logout();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: This won't be called, because logout redirects user
        return null;
    }

    return {
        [UserType.Student]: student,
        [UserType.Teacher]: teacher,
    }[user.data.userType];
};

export default useGetForUserType;
