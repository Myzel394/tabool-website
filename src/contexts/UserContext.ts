import {createContext} from "react";
import {Dayjs} from "dayjs";
import update from "immutability-helper";

// eslint-disable-next-line import/no-cycle
import {ActionType, ReducerType, UserInformation} from "../types";

export interface UserPreferences {
    data: {
        global?: {
            theme?: "light" | "dark" | "blue" | "midnight";
            allowStatistics?: boolean;
            updatedAtTimeView?: string;
            startPageMaxFutureDays?: number;
        };
        detailPage?: {
            ordering?: Record<string, string[]>;
            downloadedMaterials?: Record<string, Dayjs>;
        };
        timetable?: {
            showFreePeriods?: boolean;
            showDetails?: boolean;
        };
    };
    id: string;
}

export interface IUser {
    isAuthenticated: boolean;
    isAdmin: boolean;
    data: null | Omit<UserInformation, "preference">;
    preference: null | UserPreferences;
}

export const initialUserState: IUser = {
    isAuthenticated: false,
    isAdmin: false,
    data: null,
    preference: null,
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
                preference,
            } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                preference,
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

        case "setPreferences": {
            const {newPreferences} = action.payload;

            return update(state, {
                preference: {
                    data: {
                        $set: newPreferences,
                    },
                },
            });
        }

        default: {
            throw new Error();
        }
    }
};

export default UserContext;
