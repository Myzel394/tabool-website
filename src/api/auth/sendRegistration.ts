import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export interface ISendRegistrationData {
    email: string;
    password: string;
    token: string;
}

export interface ISendRegistrationResponse {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
}

const sendRegistration = async ({email, password, token}: ISendRegistrationData): Promise<ISendRegistrationResponse> => {
    const client = applyCaseMiddleware(axios.create());

    const {data} = await client.post("/api/auth/registration/", {
        email,
        password,
        token,
    });
    return data;
};

export default sendRegistration;
