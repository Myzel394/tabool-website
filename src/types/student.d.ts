import {Gender} from "../api";

import {TeacherDetail} from "./teacher";

export interface StudentApprox {
    firstName: string;
    lastName: string;
    id: string;
}

export interface StudentDetail extends StudentApprox {
    email: string;
    gender: Gender;
    classNumber: number;
    mainTeacher: TeacherDetail;
}
