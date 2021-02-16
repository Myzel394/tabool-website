import {createContext} from "react";

// eslint-disable-next-line import/no-cycle
import {ActionType, ReducerType, UserInformation} from "../types";

export interface IUser {
    isAuthenticated: boolean;
    isAdmin: boolean;
    data: null | Omit<UserInformation, "preference">;
}

export const initialUserState: IUser = {
    isAuthenticated: false,
    isAdmin: false,
    data: null,
};


const UserContext = createContext<ReducerType<IUser>>({
    state: initialUserState,
    dispatch: () => {
        throw new Error("Dispatch method not implemented!");
    },
});

export const reducer = (state: IUser, action: ActionType): IUser => {
    switch (action.type) {
        case "logout": {
            return initialUserState;
        }

        case "login": {
            const {
                firstName,
                lastName,
                email,
                gender,
                userType,
                id,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                data: {
                    firstName,
                    lastName,
                    email,
                    gender,
                    userType,
                    id,
                },
            };
        }

        default: {
            throw new Error();
        }
    }
};

export default UserContext;
