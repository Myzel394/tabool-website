/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventApprox, FetchListData, PaginatedResponse} from "types";
import {getLoginConfig} from "api";

import parseEventApprox from "./parseEventApprox";

export interface IFetchEventListData extends FetchListData {
    ordering?: "start_datetime" | "-start_datetime" | "end_datetime" | "-end_datetime";
    roomId?: string;
    ignore?: boolean;
    startDateMin?: string;
    startDateMax?: string;
    endDateMin?: string;
    endDateMax?: string;
}

export type IFetchEventListResponse = PaginatedResponse<EventApprox[]>;

const useFetchEventListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "start_datetime",
        ignore,
        roomId,
        startDateMin,
        startDateMax,
        endDateMin,
        endDateMax,
        search,
    }: IFetchEventListData = {}, page = 1): Promise<IFetchEventListResponse> => {
        const {data} = await instance.get("/api/data/event/", {
            params: {
                ordering,
                page,
                search,
                ignore,
                room: roomId,
                start_datetime__gte: startDateMin,
                start_datetime__lte: startDateMax,
                end_datetime__gte: endDateMin,
                end_datetime__lte: endDateMax,
            },
            ...await getLoginConfig(),
        });
        await Promise.allSettled(data.results.map(parseEventApprox));

        return data;
    }, [instance]);
};

export default useFetchEventListAPI;
