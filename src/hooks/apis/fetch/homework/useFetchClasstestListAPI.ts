/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ClasstestApprox, FetchListData, PaginatedResponse} from "types";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchClasstestListData extends FetchListData {
    ordering?: "targeted_date" | "-targeted_date";
    targetedDateMin?: string;
    targetedDateMax?: string;
    targetedDate?: string;
    courseId?: string;
    subjectId?: string;
}

export type IFetchClasstestListResponse = PaginatedResponse<ClasstestApprox[]>;

const useFetchClasstestListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        page,
        search,
        courseId,
        ordering,
        subjectId,
        targetedDate,
        targetedDateMax,
        targetedDateMin,
    }: IFetchClasstestListData = {}): Promise<IFetchClasstestListResponse> => {
        const {data} = await instance.get("/api/data/classtest/", {
            params: {
                search,
                page,
                ordering,
                course: courseId,
                subject: subjectId,
                ...(
                    targetedDate ? {
                        targeted_date__exact: targetedDate,
                    } : {
                        targeted_date__gte: targetedDateMin,
                        targeted_date__lte: targetedDateMax,
                    }
                ),
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["targetedDate"]));

        return data;
    }, [instance]);
};

export default useFetchClasstestListAPI;
