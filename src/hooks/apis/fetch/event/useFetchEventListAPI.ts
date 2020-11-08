/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventApprox, FetchListData, PaginatedResponse} from "types";
import {convertToDate, getLoginConfig} from "api";
import {isAllDay} from "utils";

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

    return useCallback(async (key: string, {
        ordering = "start_datetime",
        ignore,
        roomId,
        page,
        startDateMin,
        startDateMax,
        endDateMin,
        endDateMax,
        search,
    }: IFetchEventListData): Promise<IFetchEventListResponse> => {
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
        data.results.forEach(element => {
            convertToDate(element, [
                "startDatetime",
                "endDatetime",
            ]);
            element.isAllDay = isAllDay(element.startDatetime, element.endDatetime);
        });

        return data;
    }, [instance]);
};

export default useFetchEventListAPI;
