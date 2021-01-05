import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import getLoginConfig from "api/getLoginConfig";

export interface IConfirmEmailData {
    confirmationKey: string;
}

export interface IConfirmEmailResponse {}

const useSendConfirmEmailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        confirmationKey,
    }: IConfirmEmailData): Promise<IConfirmEmailResponse> => {
        const {data} = await instance.post("/api/auth/confirmation/", {
            confirmationKey,
        }, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useSendConfirmEmailAPI;
