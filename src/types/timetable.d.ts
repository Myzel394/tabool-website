import {StudentLessonDetail, TeacherLessonDetail} from "./lesson";

export interface StudentTimetableDetail {
    lessons: StudentLessonDetail[];
    id: string;
}

export interface TeacherTimetableDetail {
    lessons: TeacherLessonDetail[];
}
