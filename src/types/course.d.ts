import {Subject} from "./subject";
import {TeacherDetail} from "./teacher";
import {PreferredIdType} from "./api";

export interface CourseApprox {
    subject: string;
    teacher: string;
    courseNumber: number;
    participantsCount: number;
    id: string;
}

export interface CourseDetail {
    subject: PreferredIdType<Subject>;
    teacher: PreferredIdType<TeacherDetail>;
    courseNumber: number;
    participantsCount: number;
    name: string;
    id: string;
}

