import {Dayjs} from "dayjs";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";

export interface ModificationApprox {
    startDatetime: Dayjs;
    endDatetime: Dayjs;
    modificationType: string;
    id: string;

    truncatedInformation: string;
}

export interface ModificationDetail extends Omit<ModificationApprox, "truncatedInformation"> {
    newRoom?: Room;
    newTeacher?: TeacherDetail;
    newSubject?: Subject;
    information: string;
}
