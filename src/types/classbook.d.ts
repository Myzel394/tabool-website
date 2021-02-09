import {StudentLessonDateMixin, TeacherLessonDateMixin} from "./lesson";

export interface StudentClassbook extends StudentLessonDateMixin {
    presenceContent: string;
    onlineContent: string;
    id: string;
}

export interface TeacherClassbook extends TeacherLessonDateMixin {
    presenceContent: string;
    onlineContent: string;
    id: string;
}
