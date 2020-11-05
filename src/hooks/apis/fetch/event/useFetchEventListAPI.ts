/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventApprox, PaginatedResponse} from "types";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchEventListData {
    ordering?: "start_datetime" | "end_datetime";
    search?: string;
    room?: string;
    ignore?: boolean;
    startDateMin?: string;
    startDateMax?: string;
    endDateMin?: string;
    endDateMax?: string;
}

export type IFetchEventListResponse = PaginatedResponse<EventApprox[]>;

const useFetchEventListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        endDateMax,
        ordering = "start_datetime",
        endDateMin,
        ignore,
        room,
        search,
        startDateMax,
        startDateMin,
    }: IFetchEventListData): Promise<IFetchEventListResponse> => {
        const {data} = await instance.get("/api/data/event/", {
            params: {
                ordering,
                search,
                room,
                ignore,
                start_datetime__gte: startDateMin,
                start_datetime__lte: startDateMax,
                end_datetime__gte: endDateMin,
                end_datetime__lte: endDateMax,
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, [
            "startDatetime",
            "endDatetime",
        ]));

        return data;
    }, [instance]);
};

export default useFetchEventListAPI;
