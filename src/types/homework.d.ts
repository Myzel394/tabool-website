import {Dayjs} from "dayjs";

import {StudentDetail} from "./student";
import {StudentLessonDateMixin, TeacherLessonDateMixin} from "./lesson";

export interface StudentHomeworkApprox extends StudentLessonDateMixin {
    dueDate: Dayjs;
    truncatedInformation: string | null;
    id: string;
}

export interface StudentHomeworkDetail extends Omit<StudentHomeworkApprox, "truncatedInformation"> {
    createdAt: Dayjs;
    type: string | null;
    information: string | null;
    isPrivate: boolean;
    userRelation: {
        completed: boolean;
        ignored: boolean;
    };
}

export interface TeacherHomeworkApprox extends TeacherLessonDateMixin {
    dueDate: Dayjs | null;
    truncatedInformation: string | null;
    id: string;
}

export interface TeacherHomeworkDetail extends Omit<TeacherHomeworkApprox, "truncatedInformation"> {
    createdAt: Dayjs;
    type: string | null;
    information: string | null;
    privateToStudent: StudentDetail | null;
}

