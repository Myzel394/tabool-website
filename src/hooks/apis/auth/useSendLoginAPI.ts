import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import getLoginData from "api/getLoginConfig";

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
        console.log(instance.defaults.baseURL);
        await instance.get("/api/data/subject/");
        const {data} = await instance.post("/api/auth/login/", {
            email,
            password,
        }, await getLoginData());
        return data;
    }, [instance]);
};

export default useSendLoginAPI;
