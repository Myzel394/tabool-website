import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

import {includeCSRFToken} from "../getCSRFToken";

export interface ISendFillOutData {
    classNumber: number;
    mainTeacher: string;
    scoosoUsername: string;
    scoosoPassword: string;
}

export interface ISendFillOutResponse {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
}


const sendFillOutData = async ({
    classNumber,
    mainTeacher,
    scoosoUsername,
    scoosoPassword,
}: ISendFillOutData): Promise<ISendFillOutResponse> => {
    const client = applyCaseMiddleware(axios.create());
    const {data} = await client.post("/api/auth/full-registration/", {
        student: {
            classNumber,
            mainTeacher,
        },
        scoosodata: {
            username: scoosoUsername,
            password: scoosoPassword,
        },
    }, await includeCSRFToken());
    return data;
};

export default sendFillOutData;
