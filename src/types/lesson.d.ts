import {Dayjs} from "dayjs";

import {StudentCourseDetail, TeacherCourseDetail} from "./course";

export interface StudentLessonDetail extends LessonRelatedDetail {
    course: StudentCourseDetail;
    startHour: number;
    endHour: number;
    weekday: number;
    id: string;
}

export interface TeacherLessonDetail extends LessonRelatedDetail {
    course: TeacherCourseDetail;
    startHour: number;
    endHour: number;
    weekday: number;
    id: string;
}

export interface LessonDateMixin {
    lesson: StudentLessonDetail;
    lessonDate: Dayjs;
}

export interface StudentLessonDateMixin extends LessonDateMixin {
}

export interface TeacherLessonDateMixin extends LessonDateMixin {
}
