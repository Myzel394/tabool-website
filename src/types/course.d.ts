import {Subject} from "./subject";
import {TeacherDetail} from "./teacher";
import {StudentDetail} from "./student";
import {Room} from "./room";

export interface StudentCourseDetail {
    courseNumber: number;
    name: string;
    participantsCount: number;
    weekdays: number[];
    subject: Subject;
    teacher: TeacherDetail;
    room: Room;
    id: string;
}

export interface TeacherCourseDetail {
    courseNumber: number;
    name: string;
    weekdays: number[];
    participants: StudentDetail[];
    participantsCount: number;
    subject: Subject;
    teacher: TeacherDetail;
    room: Room;
    id: string;
}

