import {Dayjs} from "dayjs";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";
import {LessonDetail} from "./lesson";

export interface ModificationApprox {
    modificationType: string;
    id: string;
    lesson: string;

    truncatedInformation: string;
}

export interface ModificationDetail extends Omit<ModificationApprox, "truncatedInformation"> {
    newRoom?: Room;
    newTeacher?: TeacherDetail;
    newSubject?: Subject;
    information: string;
    lesson: LessonDetail;
}
