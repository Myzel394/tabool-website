import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IFetchScoosoCredentialsResponse {
    username: string;
}

const useFetchScoosoCredentialsAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchScoosoCredentialsResponse> => {
        const {data} = await instance.get("/api/auth/scooso-credentials/", await getLoginConfig());

        return data;
    }, [instance]);
};

export default useFetchScoosoCredentialsAPI;
