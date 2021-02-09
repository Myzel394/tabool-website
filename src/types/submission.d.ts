import {Dayjs} from "dayjs";

import {StudentDetail} from "./student";

export interface StudentSubmissionDetail extends LessonDateMixin {
    publishDatetime: Dayjs | null;
    name: string;
    file: string;
    createdAt: Dayjs;
    id: string;
}

export interface TeacherSubmissionDetail extends LessonDateMixin {
    file: string;
    name: string;
    student: StudentDetail;
    id: string;
}


