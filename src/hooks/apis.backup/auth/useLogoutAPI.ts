import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

const useLogoutAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<void> => {
        const {data} = await instance.post("/api/auth/logout/", {}, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useLogoutAPI;
