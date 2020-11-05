import {Dayjs} from "dayjs";

import {Room} from "./room";
import {TeacherDetail} from "./teacher";
import {Subject} from "./subject";

export interface ModificationApprox {
    startDatetime: Dayjs;
    endDatetime: Dayjs;
    modificationType: string;
    id: string;
}

export interface ModificationDetail extends ModificationApprox {
    newRoom?: Room;
    newTeacher?: TeacherDetail;
    newSubject?: Subject;
    information: string;
}
