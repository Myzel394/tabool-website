import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Gender, UserType} from "api";
import {Preferences, TeacherDetail} from "types";

import {parsePreference} from "../preference";

export interface ILoginData {
    email: string;
    password: string;

    otpKey?: string;
}

interface StudentData {
    classNumber: number;
    mainTeacher: TeacherDetail;
}

interface TeacherData {
    shortName: string;
}

export interface ILoginResponse {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    userType: UserType;
    gender: Gender;
    preference: Preferences;
    student: StudentData | null;
    teacher: TeacherData | null;
}

export interface ILoginResponseAsStudent extends ILoginResponse {
    userType: UserType.Student;
    student: StudentData;
    teacher: null;
}

export interface ILoginResponseAsTeacher extends ILoginResponse {
    userType: UserType.Teacher;
    teacher: TeacherData;
    student: null;
}

const useSendLoginAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        email,
        password,
        otpKey,
    }: ILoginData): Promise<ILoginResponseAsStudent | ILoginResponseAsTeacher> => {
        const {data} = await instance.post("/api/auth/login/", {
            email,
            password,
            otpKey,
        });
        data.preference = await parsePreference(data.preference);
        return data;
    }, [instance]);
};

export default useSendLoginAPI;
