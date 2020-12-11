import {useContext} from "react";
import {UserContext} from "contexts";
import {IUser} from "contexts/UserContext";

const useUser = (): IUser => {
    return useContext(UserContext).state;
};

export default useUser;
