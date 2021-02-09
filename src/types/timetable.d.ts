import {StudentLessonDetail, TeacherLessonDetail} from "./lesson";

export interface StudentTimetableDetail {
    lessons: StudentLessonDetail[];
}

export interface TeacherTimetableDetail {
    lessons: TeacherLessonDetail[];
}
