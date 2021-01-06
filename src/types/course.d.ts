import {Subject} from "./subject";
import {TeacherDetail} from "./teacher";

export interface CourseApprox {
    subject: Subject;
    teacher: TeacherDetail;
    courseNumber: number;
    shortName: string;
    name: string;
    id: string;
}

export interface CourseDetail extends CourseApprox {
    participantsCount: number;
    weekdays: number[];
    id: string;
}

