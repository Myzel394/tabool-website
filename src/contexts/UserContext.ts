import {createContext} from "react";
import {ReducerType} from "types";
import {Dayjs} from "dayjs";

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
    preferences: null | {
        global: {
            theme: string;
            allowStatistics: boolean;
        };
        detailPage: {
            ordering: Record<string, string[]>;
            downloadedMaterials: Record<string, Dayjs>;
        };
        timetable: {
            showFreePeriods: boolean;
            showDetails: boolean;
        };
    };
}

export const initialUserState: IUser = {
    isAuthenticated: false,
    isFullyRegistered: false,
    isEmailVerified: false,
    isAdmin: false,
    data: null,
    preferences: null,
};


const UserContext = createContext<ReducerType<IUser>>({
    state: initialUserState,
    dispatch: () => {
        throw new Error("Dispatch method not implemented!");
    },
});

export default UserContext;
