import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import getLoginData from "api/getLoginConfig";

export interface ISendFillOutDataData {
    classNumber: number;
    mainTeacher: string;
    scoosoUsername: string;
    scoosoPassword: string;
}

export interface ISendFillOutDataResponse {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
}

const useSendFillOutDataAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        classNumber,
        mainTeacher,
        scoosoUsername,
        scoosoPassword,
    }: ISendFillOutDataData): Promise<ISendFillOutDataResponse> => {
        const loginData = await getLoginData();
        const {data} = await instance.post("/api/auth/full-registration/", {
            student: {
                classNumber,
                mainTeacher,
            },
            scoosodata: {
                username: scoosoUsername,
                password: scoosoPassword,
            },
        }, loginData);
        return data;
    }, [instance]);
};

export default useSendFillOutDataAPI;
