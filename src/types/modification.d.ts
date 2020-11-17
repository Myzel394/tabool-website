import {Dayjs} from "dayjs";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";
import {LessonDetail} from "./lesson";
import {PreferredIdType} from "./api";
import {modificationTypeOptions} from "../api";

export enum ModificationTypeOptions {
    REPLACEMENT,
    FREE_PERIOD,
    SELF_LEARN,
    ROOM_CHANGE,
}

export interface ModificationApprox {
    modificationType: ModificationTypeOptions;
    id: string;
    lesson: string;

    truncatedInformation: string;
}

export interface ModificationDetail extends Omit<ModificationApprox, "truncatedInformation"> {
    newRoom?: PreferredIdType<Room>;
    newTeacher?: PreferredIdType<TeacherDetail>;
    newSubject?: PreferredIdType<Subject>;
    information: string;
    lesson: PreferredIdType<LessonDetail>;
}
