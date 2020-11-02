import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";

export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginResponse {
    hasFilledOutData: boolean;
    isConfirmed: boolean;
}

const useSendLoginAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        email,
        password,
    }: ILoginData): Promise<ILoginResponse> => {
        const {data} = await instance.post("/api/auth/login/", {
            email,
            password,
        });
        return data;
    }, [instance]);
};

export default useSendLoginAPI;
