import {Subject} from "./subject";
import {TeacherDetail} from "./teacher";
import {StudentDetail} from "./student";

export interface CourseApprox {
    courseNumber: number;
    name: string;
    subject: Subject;
    participantsCount: number;
    id: string;
}

export interface StudentCourseDetail extends CourseApprox {
    teacher: TeacherDetail;
}

export interface TeacherCourseDetail extends Omit<CourseApprox, "participantsCount"> {
    participants: StudentDetail[];
    participantsCount: number;
}

