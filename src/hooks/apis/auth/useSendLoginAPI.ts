import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";

export interface ILoginData {
    email: string;
    password: string;

    otpKey?: string;
}

export interface ILoginResponse {
    hasFilledOutData: boolean;
    isConfirmed: boolean;
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}

const useSendLoginAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        email,
        password,
        otpKey,
    }: ILoginData): Promise<ILoginResponse> => {
        const {data} = await instance.post("/api/auth/login/", {
            email,
            password,
            otpKey,
        });
        return data;
    }, [instance]);
};

export default useSendLoginAPI;
