import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IUpdateScoosoCredentialsData {
    username: string;
    password: string;
}

const useUpdateScoosoCredentialsAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        username,
        password,
    }: IUpdateScoosoCredentialsData): Promise<void> => {
        const {data} = await instance.put("/api/auth/scooso-credentials/", {
            username,
            password,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useUpdateScoosoCredentialsAPI;
