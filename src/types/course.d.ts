import {Subject} from "./subject";
import {TeacherDetail} from "./teacher";
import {StudentDetail} from "./student";

export interface StudentCourseDetail {
    courseNumber: number;
    name: string;
    subject: Subject;
    participantsCount: number;
    id: string;
    teacher: TeacherDetail;
}

export interface TeacherCourseDetail {
    courseNumber: number;
    name: string;
    subject: Subject;
    id: string;
    participants: StudentDetail[];
    participantsCount: number;
}

