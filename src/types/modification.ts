import {Dayjs} from "dayjs";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";
import {LessonDetail} from "./lesson";

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
    startDatetime: Dayjs;
    endDatetime: Dayjs;

    truncatedInformation: string;
}

export interface ModificationDetail extends Omit<ModificationApprox, "truncatedInformation" | "lesson"> {
    newRoom?: Room;
    newTeacher?: TeacherDetail;
    newSubject?: Subject;
    information: string;
    lesson: LessonDetail;
}
