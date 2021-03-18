import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Preferences} from "types";

import {parsePreference} from "../preference";

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
    loadScoosoData: boolean;
    preference: Preferences;
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
        await parsePreference(data.preference);
        return data;
    }, [instance]);
};

export default useSendLoginAPI;
