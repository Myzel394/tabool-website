import {Gender, UserType} from "../api";

// eslint-disable-next-line import/no-cycle
import {ServerPreference} from "./preference";
import {TeacherDetail} from "./teacher";

export interface UserStudentInformation {
    classNumber: number;
    mainTeacher: TeacherDetail;
}

export interface UserTeacherInformation {
    shortName: string;
}

export interface MainUserInformation {
    preference: ServerPreference;
    firstName: string;
    lastName: string;
    email: string;
    userType: UserType;
    gender: Gender;
    id: string;
    student: UserStudentInformation | null;
    teacher: UserTeacherInformation | null;
}

export interface MainUserInformationAsStudent extends MainUserInformation {
    userType: UserType.Student;
    student: UserStudentInformation;
    teacher: null;
}

export interface MainUserInformationAsTeacher extends MainUserInformation {
    userType: UserType.Teacher;
    student: null;
    teacher: UserTeacherInformation;
}

export type UserInformation = MainUserInformationAsStudent | MainUserInformationAsTeacher;

export interface UserDetail {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}
