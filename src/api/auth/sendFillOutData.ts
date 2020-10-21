import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export interface ISendFillOutData {
    classNumber: number;
    mainTeacher: number;
    scoosoUsername: string;
    scoosoPassword: string;
}

export interface ISendFillOutResponse {}


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
    }, {
        withCredentials: true,
    });
    return data;
};

export default sendFillOutData;
