/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherExamApprox} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherExamApprox from "./parseTeacherExamApprox";

export interface IFetchTeacherExamData extends FetchListData {
    ordering?: "date" | "-date" | "title" | "-title";
    courseId?: string;
    dateMin?: Dayjs;
    dateMax?: Dayjs;
}

export type IFetchTeacherExamResponse = PaginatedResponse<TeacherExamApprox[]>;


const useFetchTeacherExamListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "-date",
        search,
        pageSize,
        courseId,
        dateMax,
        dateMin,
    }: IFetchTeacherExamData = {}, page = 1): Promise<IFetchTeacherExamResponse> => {
        const {data} = await instance.get(buildUrl("/exam/"), {
            params: {
                search,
                ordering,
                page,
                pageSize,
                course: courseId,
                date__gte: dateMin ? lazyDatetime(dateMin, "date") : undefined,
                date__lte: dateMax ? lazyDatetime(dateMax, "date") : undefined,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseTeacherExamApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherExamListAPI;
