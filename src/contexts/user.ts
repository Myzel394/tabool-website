import {createContext} from "react";

interface IUser {
    isAuthenticated: boolean;
    data: null | {
        email: string;
        firstName: string;
        lastName: string;
    };
}

const initialState: IUser = {
    isAuthenticated: false,
    data: null,
};


const UserContext = createContext<IUser>(initialState);

export default UserContext;
