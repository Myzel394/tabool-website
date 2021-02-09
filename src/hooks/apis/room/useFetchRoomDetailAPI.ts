import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Room} from "types";
import {getLoginConfig} from "api";

const useFetchRoomDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Room> => {
        const {data} = await instance.get(buildUrl(`/room/${id}/`), await getLoginConfig());
        return data;
    }, [instance, buildUrl]);
};

export default useFetchRoomDetailAPI;
