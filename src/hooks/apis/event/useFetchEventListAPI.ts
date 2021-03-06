/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail, FetchListData, PaginatedResponse} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseEventDetail from "./parseEventDetail";

export interface IFetchEventData extends FetchListData {
    ordering?: "title" | "-title" | "start_datetime" | "-start_datetime" | "end_datetime" | "-end_datetime";
    roomId?: string;
    startDatetimeMin?: Dayjs;
    startDatetimeMax?: Dayjs;
    endDatetimeMin?: Dayjs;
    endDatetimeMax?: Dayjs;
}

export type IFetchEventResponse = PaginatedResponse<EventDetail[]>;

const useFetchEventListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "-start_datetime",
        search,
        pageSize,
        endDatetimeMax,
        endDatetimeMin,
        roomId,
        startDatetimeMax,
        startDatetimeMin,
    }: IFetchEventData = {}, page = 1): Promise<IFetchEventResponse> => {
        const {data} = await instance.get(buildUrl("/event/"), {
            params: {
                search,
                ordering,
                page,
                pageSize,
                room: roomId,
                start_datetime__gte: lazyDatetime(startDatetimeMin),
                start_datetime__lte: lazyDatetime(startDatetimeMax),
                end_datetime__gte: lazyDatetime(endDatetimeMin),
                end_datetime__lte: lazyDatetime(startDatetimeMax),
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseEventDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchEventListAPI;
