import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IRequestPasswordResetData {
    email: string;
}

const useRequestPasswordResetAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        email,
    }: IRequestPasswordResetData): Promise<void> => {
        const {data} = await instance.post("/api/auth/reset-password/", {
            email,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useRequestPasswordResetAPI;
