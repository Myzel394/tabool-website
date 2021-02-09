import {Gender, UserType} from "../api";

import {Preference} from "./preference";

export interface UserInformation {
    preference: Preference;
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
