import {createContext} from "react";

import {ActionType} from "../types";

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
    isAuthenticated: false,
    isFullyRegistered: false,
    isEmailVerified: false,
    isAdmin: false,
    data: null,
};

export interface ContextType {
    state: IUser;
    dispatch: (action: ActionType) => void;
}


const UserContext = createContext<ContextType>({
    state: initialUserState,
    dispatch: () => {
        throw new Error("Context got no value");
    },
});

export default UserContext;
