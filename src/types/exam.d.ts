import {Dayjs} from "dayjs";

import {StudentCourseDetail, TeacherCourseDetail} from "./course";

export interface StudentExamApprox {
    course: StudentCourseDetail;
    date: Dayjs;
    title: string;
    id: string;
}

export interface TeacherExamApprox {
    course: TeacherCourseDetail;
    date: Dayjs;
    title: string;
    id: string;
}

export interface StudentExamDetail extends StudentExamApprox {
    information: string | null;
}

export interface TeacherExamDetail extends TeacherExamApprox {
    information: string | null;
    createdAt: Dayjs;
}
