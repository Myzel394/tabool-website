import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

const useDeleteSessionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<void> => {
        const {data} = await instance.delete(`/api/auth/session/${id}/`, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useDeleteSessionAPI;
