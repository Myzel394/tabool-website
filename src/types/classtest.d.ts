import {Dayjs} from "dayjs";

import {CourseDetail} from "./course";
import {Room} from "./room";
import {PreferredIdType} from "./api";

export interface ClasstestApprox {
    course: string;
    targetedDate: Dayjs;
    id: string;

    truncatedInformation: string;
}

export interface ClasstestDetail extends Omit<ClasstestApprox, "truncatedInformation"> {
    course: PreferredIdType<CourseDetail>;
    room?: PreferredIdType<Room>;
    information: string;
    createdAt: Dayjs;
}
