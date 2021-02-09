import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, Room} from "types";
import getLoginConfig from "api/getLoginConfig";

export interface IFetchRoomData extends FetchListData {
    ordering?: "place" | "-place";
}

export type IFetchRoomResponse = PaginatedResponse<Room[]>;

const useFetchRoomListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "place",
        search,
        pageSize,
    }: IFetchRoomData = {}, page = 1): Promise<IFetchRoomResponse> => {
        const {data} = await instance.get(buildUrl("/room/"), {
            params: {
                search,
                ordering,
                page,
                pageSize,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance, buildUrl]);
};

export default useFetchRoomListAPI;
