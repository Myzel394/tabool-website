import {Dayjs} from "dayjs";
import {ModificationType} from "api";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";
import {LessonRelatedDetail} from "./lesson";

export interface ModificationApprox {
    lesson?: string;
    modificationType: ModificationType;
    id: string;
    startDatetime: Dayjs;
    endDatetime: Dayjs;

    truncatedInformation: string;
}

export interface ModificationDetail extends Omit<ModificationApprox, "truncatedInformation" | "lesson"> {
    lesson: LessonRelatedDetail;
    information: string;

    newRoom?: Room;
    newTeacher?: TeacherDetail;
    newSubject?: Subject;
}
