import {Gender, UserType} from "../api";

// eslint-disable-next-line import/no-cycle
import {ServerPreference} from "./preference";

export interface UserInformation {
    preference: ServerPreference;
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
    gender: Gender;
    id: string;
}

export interface UserDetail {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}
