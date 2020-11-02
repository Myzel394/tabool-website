import {Dayjs} from "dayjs";

import {CourseDetail} from "./course";
import {Room} from "./room";

export interface ClasstestApprox {
    course: string;
    targetedDate: Dayjs;
    id: string;
}

export interface ClasstestDetail extends ClasstestApprox {
    course: CourseDetail;
    room: Room;
    information: string;
    createdAt: Dayjs;
}
