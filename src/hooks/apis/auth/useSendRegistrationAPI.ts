import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";

export interface IRegistrationData {
    email: string;
    password: string;
    token: string;
}

export interface IRegistrationResponse {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
}

const useSendRegistrationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        email,
        password,
        token,
    }: IRegistrationData): Promise<IRegistrationResponse> => {
        const {data} = await instance.post("/api/auth/registration/", {
            email,
            password,
            token,
        });
        return data;
    }, [instance]);
};

export default useSendRegistrationAPI;
