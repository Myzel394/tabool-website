/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {convertToDate, getLoginConfig} from "api";
import {FetchListData, ModificationApprox, PaginatedResponse} from "types";

export interface IFetchModificationListData extends FetchListData {
    ordering?: "start_datetime" | "-start_datetime" | "end_datetime" | "-end_datetime";
    startDateMin?: string;
    startDateMax?: string;
    endDateMin?: string;
    endDateMax?: string;
    modificationType?: string;
}

export type IFetchModificationListResponse = PaginatedResponse<ModificationApprox[]>;

const useFetchModificationListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (search: string, {
        ordering = "start_datetime",
        endDateMax,
        endDateMin,
        modificationType,
        startDateMax,
        startDateMin,
        page,
    }: IFetchModificationListData): Promise<IFetchModificationListResponse> => {
        const {data} = await instance.get("api/data/modification/", {
            params: {
                page,
                ordering,
                search,
                modification_type__iexact: modificationType,
                start_datetime__gte: startDateMin,
                start_datetime__lte: startDateMax,
                end_datetime__gte: endDateMin,
                end_datetime__lte: endDateMax,
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["startDatetime", "endDatetime"]));

        return data;
    }, [instance]);
};

export default useFetchModificationListAPI;
