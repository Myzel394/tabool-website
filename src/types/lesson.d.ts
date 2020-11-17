import {Dayjs} from "dayjs";

import {Room} from "./room";
import {CourseDetail} from "./course";
import {PreferredIdType} from "./api";

export interface LessonDataApprox {
    course: string;
    startTime: Dayjs;
    endTime: Dayjs;
    weekday: number;
    id: string;
}

export interface LessonDataDetail extends LessonDataApprox{
    course: PreferredIdType<CourseDetail>;
    room: PreferredIdType<Room>;
}


export interface LessonApprox {
    lessonData: LessonDataApprox;
    date: Dayjs;
    id: string;
}

export interface LessonDetail extends LessonApprox {
    lessonData: LessonDataDetail;
    userRelation: {
        attendance: boolean;
    };
}

