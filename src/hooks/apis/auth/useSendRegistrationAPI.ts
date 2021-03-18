import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Preferences} from "types";

import {parsePreference} from "../preference";


export interface IRegistrationData {
    email: string;
    password: string;
    token: string;
}

export interface IRegistrationResponse {
    hasFilledOutData: boolean;
    isConfirmed: boolean;
    firstName: string;
    lastName: string;
    email: string;
    loadScoosoData: boolean;
    preference: Preferences;
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
        await parsePreference(data.preference);
        return data;
    }, [instance]);
};

export default useSendRegistrationAPI;
