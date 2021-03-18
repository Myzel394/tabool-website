// eslint-disable-next-line import/no-cycle
import {ServerPreference} from "./preference";

export interface UserInformation {
    preference: ServerPreference;
    firstName: string;
    lastName: string;
    email: string;
    loadScoosoData: boolean;
    id: string;
}

export interface UserDetail {
    firstName: string;
    lastName: string;
    loadScoosoData: boolean;
    email: string;
    id: string;
}
