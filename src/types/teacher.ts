export enum Gender {
    Male,
    Female,
    Diverse,
    Unknown
}

export interface TeacherApprox {
    shortName: string;
    lastName: string;
    id: string;
}

export interface TeacherDetail extends TeacherApprox {
    firstName: string;
    email: string;
    gender: Gender;
}
