import {createContext} from "react";
import {Dayjs} from "dayjs";

// eslint-disable-next-line import/no-cycle
import {ReducerType, UserInformation} from "../types";

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

export default UserContext;
