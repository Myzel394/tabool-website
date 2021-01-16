import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface ISendFCMTokenData {
    registrationId: string;
}

const useSendFCMTokenAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        registrationId,
    }: ISendFCMTokenData): Promise<void> => {
        const {data} = await instance.post("/api/fcm/devices/", {
            registrationId,
            type: "web",
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useSendFCMTokenAPI;
