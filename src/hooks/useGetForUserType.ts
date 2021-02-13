import {UserType} from "api";

import useUser from "./useUser";

const useGetForUserType = <S, T>(student: S, teacher: T): S | T => {
    const user = useUser();

    if (!user.data?.userType) {
        throw new Error("User has no userType");
    }

    return {
        [UserType.Student]: student,
        [UserType.Teacher]: teacher,
    }[user.data.userType];
};

export default useGetForUserType;
