import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Room} from "types";
import {getLoginConfig} from "api";

const useFetchRoomDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<Room> => {
        const {data} = await instance.get(`/api/data/room/${id}/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchRoomDetailAPI;
