import {createContext} from "react";
import update from "immutability-helper";

// eslint-disable-next-line import/no-cycle
import {ActionType, ReducerType, UserInformation} from "../types";

export interface IUser {
    isAuthenticated: boolean;
    isFullyRegistered: boolean;
    isEmailVerified: boolean;
    isAdmin: boolean;
    data: null | Omit<UserInformation, "preference">;
}

export const initialUserState: IUser = {
    isAuthenticated: false,
    isAdmin: false,
    isFullyRegistered: false,
    isEmailVerified: false,
    data: null,
};


const UserContext = createContext<ReducerType<IUser> & { logout: () => null; }>({
    state: initialUserState,
    dispatch: () => {
        throw new Error("Dispatch method not implemented!");
    },
    logout: () => {
        throw new Error("Logout method not implemented!");
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
                id,
                loadScoosoData,
                hasFilledOutData,
                isConfirmed,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                isEmailVerified: isConfirmed,
                isFullyRegistered: hasFilledOutData,
                data: {
                    firstName,
                    lastName,
                    email,
                    id,
                    loadScoosoData,
                },
            };
        }


        case "change_load_scooso_data": {
            const {loadScoosoData} = action.payload;

            return update(state, {
                data: {
                    loadScoosoData: {
                        $set: loadScoosoData,
                    },
                },
            });
        }

        case "verify-email": {
            return {
                ...state,
                isEmailVerified: true,
            };
        }

        case "fill-out-data": {
            return {
                ...state,
                isFullyRegistered: true,
            };
        }

        case "registration": {
            const {
                email,
                firstName,
                lastName,
                id,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                isEmailVerified: true,
                isFullyRegistered: false,
                data: {
                    firstName,
                    email,
                    id,
                    lastName,
                    loadScoosoData: true,
                },
            };
        }

        default: {
            throw new Error();
        }
    }
};

export default UserContext;
