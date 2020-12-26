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
        const {data} = await instance.post("/api/auth/confirmation/", {
            confirmationKey: token,
        }, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useSendConfirmEmailAPI;
