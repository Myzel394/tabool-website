import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";
import {LessonDetail} from "./lesson";
import {PreferredIdType} from "./api";

export enum ModificationType {
    Replacement,
    FreePeriod,
    SelfLearn,
    RoomChange,
}

export interface ModificationApprox {
    modificationType: ModificationType;
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
