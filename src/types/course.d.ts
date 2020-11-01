import {Subject} from "./subject";
import {TeacherDetail} from "./teacher";

export interface Course {
    subject: Subject;
    teacher: TeacherDetail;
    courseNumber: number;
    participantsCount: number;
    name: string;
    id: string;
}

export interface RawCourse {
    subject: string;
    teacher: string;
    courseNumber: number;
    participantsCount: number;
    id: string;
}

