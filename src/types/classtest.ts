import {Dayjs} from "dayjs";

import {CourseDetail} from "./course";
import {Room} from "./room";

export interface ClasstestApprox {
    course: string;
    targetedDate: Dayjs;
    id: string;

    truncatedInformation: string;
}

export interface ClasstestDetail extends Omit<ClasstestApprox, "truncatedInformation" | "course"> {
    course: CourseDetail;
    room?: Room;
    information: string;
    createdAt: Dayjs;
}
