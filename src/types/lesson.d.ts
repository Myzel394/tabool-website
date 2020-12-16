import {Dayjs} from "dayjs";

import {ModificationDetail} from "../api/serverType/modification";

import {Room} from "./room";
import {CourseDetail} from "./course";
import {ClassBook} from "./classBook";
import {MaterialDetail} from "./material";
import {HomeworkDetail} from "./homework";

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
    materials: MaterialDetail[];
    homeworks: HomeworkDetail[];
    modifications: ModificationDetail[];
    userRelation: {
        attendance: boolean;
    };
}

