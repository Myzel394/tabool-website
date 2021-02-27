import {Dayjs} from "dayjs";

import {StudentDetail} from "./student";
import {StudentLessonDateMixin, TeacherLessonDateMixin} from "./lesson";

export interface StudentSubmissionDetail extends StudentLessonDateMixin {
    publishDatetime: Dayjs | null;
    name: string;
    file: string;
    createdAt: Dayjs;
    size: number;
    isUploaded: boolean;
    id: string;
}

export interface TeacherSubmissionDetail extends TeacherLessonDateMixin {
    file: string;
    name: string;
    student: StudentDetail;
    size: number;
    id: string;
}


