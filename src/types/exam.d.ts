import {Dayjs} from "dayjs";

import {CourseDetail} from "./course";
import {Room} from "./room";

export interface ExamApprox {
    course: string;
    targetedDate: Dayjs;
    id: string;

    truncatedInformation: string;
}

export interface ExamDetail extends Omit<ExamApprox, "truncatedInformation" | "course"> {
    course: CourseDetail;
    room?: Room;
    information: string | null;
    createdAt: Dayjs;
}
