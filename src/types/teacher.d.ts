export interface TeacherApprox {
    shortName: string;
    lastName: string;
    gender: Gender;
    id: string;
}

export interface TeacherDetail extends TeacherApprox {
    firstName: string;
    email: string;
}
