import {createContext} from "react";
import {ReducerType} from "types";

export interface IUser {
    isAuthenticated: boolean;
    isFullyRegistered: boolean;
    isEmailVerified: boolean;
    isAdmin: boolean;
    data: null | {
        email: string;
        id: string;
        firstName?: string;
        lastName?: string;
    };
}

export const initialUserState: IUser = {
    isAuthenticated: true,
    isFullyRegistered: false,
    isEmailVerified: false,
    isAdmin: false,
    data: null,
};


const UserContext = createContext<ReducerType<IUser>>({
    state: initialUserState,
    dispatch: () => {
        throw new Error("Dispatch method not implemented yet.");
    },
});

export default UserContext;
