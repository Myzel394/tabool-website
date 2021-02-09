import {Dayjs} from "dayjs";

import {StudentDetail} from "./student";

export interface StudentHomeworkApprox extends LessonDateMixin {
    dueDate: Dayjs | null;
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

export interface TeacherHomeworkApprox extends LessonDateMixin {
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

