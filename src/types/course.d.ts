import {TeacherDetail} from "../api/serverType/teacher";

import {Subject} from "./subject";

export interface CourseApprox {
    subject: string;
    teacher: string;
    courseNumber: number;
    participantsCount: number;
    id: string;
}

export interface CourseDetail {
    subject: Subject;
    teacher: TeacherDetail;
    courseNumber: number;
    participantsCount: number;
    name: string;
    id: string;
}

