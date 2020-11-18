export interface TeacherApprox {
    shortName: string;
    lastName: string;
    id: string;
}

export interface TeacherDetail extends TeacherApprox {
    firstName: string;
    email: string;
}
