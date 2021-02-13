import {Dayjs} from "dayjs";

import {StudentCourseDetail, TeacherCourseDetail} from "./course";

export interface StudentLessonDetail {
    course: StudentCourseDetail;
    startHour: number;
    endHour: number;
    weekday: number;
    id: string;
}

export interface TeacherLessonDetail {
    course: TeacherCourseDetail;
    startHour: number;
    endHour: number;
    weekday: number;
    id: string;
}

export interface StudentLessonDateMixin {
    lesson: StudentLessonDetail;
    lessonDate: Dayjs;
}

export interface TeacherLessonDateMixin {
    lesson: TeacherLessonDetail;
    lessonDate: Dayjs;
}
