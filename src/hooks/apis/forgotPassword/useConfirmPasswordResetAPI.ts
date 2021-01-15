import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IConfirmPasswordResetData {
    token: string;
    email: string;
    password: string;
}

const useConfirmPasswordResetAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        email,
        password,
        token,
    }: IConfirmPasswordResetData): Promise<void> => {
        const {data} = await instance.post("/api/auth/reset-password/confirm/", {
            email,
            password,
            token,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useConfirmPasswordResetAPI;
