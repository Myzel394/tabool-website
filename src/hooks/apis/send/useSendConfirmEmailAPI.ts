import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import getLoginConfig from "api/getLoginConfig";

export interface IConfirmEmailData {
    token: string;
}

export interface IConfirmEmailResponse {}

const useSendConfirmEmailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({token}: IConfirmEmailData): Promise<IConfirmEmailResponse> => {
        const loginData = await getLoginConfig();
        const {data} = await instance.post("/api/auth/confirmation/", {
            confirmationKey: token,
        }, loginData);
        return data;
    }, [instance]);
};

export default useSendConfirmEmailAPI;
