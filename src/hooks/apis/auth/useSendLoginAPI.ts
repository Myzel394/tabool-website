import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Gender, UserType} from "api";

import {parsePreference} from "../preference";
import {Preferences} from "../../../contexts/UserContext";

export interface ILoginData {
    email: string;
    password: string;

    otpKey?: string;
}

export interface ILoginResponse {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    userType: UserType;
    gender: Gender;
    preference: Preferences;
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
        await parsePreference(data.preference);
        return data;
    }, [instance]);
};

export default useSendLoginAPI;
