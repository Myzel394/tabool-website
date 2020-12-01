/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, MaterialApprox, PaginatedResponse} from "types";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchMaterialListData extends FetchListData {
    addedAtMin?: string;
    addedAtMax?: string;
    addedAtDate?: string;
    lessonDateMin?: string;
    lessonDateMax?: string;
    lessonId?: string;
    courseId?: string;
    ordering?: "added_at" | "-added_at" | "name" | "-name";
}

export type IFetchMaterialListResponse = PaginatedResponse<MaterialApprox[]>;

const useFetchMaterialListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (search: string, {
        ordering = "-added_at",
        addedAtDate,
        addedAtMax,
        addedAtMin,
        courseId,
        lessonId,
        page,
        lessonDateMax,
        lessonDateMin,
    }: IFetchMaterialListData = {}): Promise<IFetchMaterialListResponse> => {
        const {data} = await instance.get("/api/data/material/", {
            params: {
                page,
                ordering,
                search,
                course: courseId,
                lesson: lessonId,
                lesson_date_filter_gte: lessonDateMin,
                lesson_date_filter_lte: lessonDateMax,
                ...(
                    addedAtDate ? {
                        added_at__date__exact: addedAtDate,
                    } : {
                        added_at__gte: addedAtMin,
                        added_at__lte: addedAtMax,
                    }
                ),
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["addedAt"]));

        return data;
    }, [instance]);
};

export default useFetchMaterialListAPI;
