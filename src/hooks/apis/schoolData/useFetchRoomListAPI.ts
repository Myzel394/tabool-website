import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse, Room} from "types";
import {getLoginConfig} from "api";

export interface IFetchRoomData {
    search: string;
}

export type IFetchRoomResponse = PaginatedResponse<Room>;

const useFetchRoomListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {search}: IFetchRoomData): Promise<IFetchRoomResponse> => {
        const {data} = await instance.get("/api/data/room/", {
            params: {
                search,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance]);
};

export default useFetchRoomListAPI;
