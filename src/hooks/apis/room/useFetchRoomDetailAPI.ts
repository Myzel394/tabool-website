import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Room} from "types";

const useFetchRoomDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Room> => {
        const {data} = await instance.get(`/api/data/room/${id}/`, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useFetchRoomDetailAPI;
