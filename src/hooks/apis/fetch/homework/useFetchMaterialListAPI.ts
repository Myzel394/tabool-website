/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Dayjs} from "dayjs";
import {FetchListData, HomeworkApprox, MaterialApprox, PaginatedResponse} from "types";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchMaterialListData extends FetchListData {
    addedAtMin?: string;
    addedAtMax?: string;
    addedAtDate?: string;
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
        page
    }: IFetchMaterialListData = {}): Promise<IFetchMaterialListResponse> => {
        const {data} = await instance.get("/api/data/material/", {
            params: {
                page,
                ordering,
                search,
                course: courseId,
                lesson: lessonId,
                ...(
                    addedAtDate ? {
                        added_at__date__exact: addedAtDate
                    } : {
                        added_at__gte: addedAtMin,
                        added_at__lte: addedAtMax
                    }
                )
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["addedAt"]));

        return data;
    }, [instance]);
};

export default useFetchMaterialListAPI;
