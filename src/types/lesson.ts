import {Dayjs} from "dayjs";

import {Room} from "./room";
import {CourseDetail} from "./course";
import {ClassBook} from "./classBook";

export interface LessonDataApprox {
    course: string;
    startTime: Dayjs;
    endTime: Dayjs;
    weekday: number;
    id: string;
}

export interface LessonDataDetail extends Omit<LessonDataApprox, "course" | "room"> {
    course: CourseDetail;
    room: Room;
}


export interface LessonApprox {
    lessonData: LessonDataApprox;
    date: Dayjs;
    id: string;
}

export interface LessonDetail extends Omit<LessonApprox, "lessonData"> {
    lessonData: LessonDataDetail;
    classBook: ClassBook | null;
    userRelation: {
        attendance: boolean;
    };
}

export interface LessonTimetable extends Omit<LessonApprox, "lessonData"> {
    lessonData: LessonDataDetail;
}

