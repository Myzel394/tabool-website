import axios from "axios";

export interface ISendLoginData {
    email: string;
    password: string;
}

export interface ISendLoginResponse {}

const sendLogin = async ({email, password}: ISendLoginData): Promise<ISendLoginResponse> => {
    const {data} = await axios.post("/api/auth/login/", {
        email,
        password,
    });
    return data;
};

export default sendLogin;

