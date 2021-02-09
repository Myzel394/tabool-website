/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentExamApprox} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentExamApprox from "./parseStudentExamApprox";

export interface IFetchStudentExamData extends FetchListData {
    ordering?: "date" | "-date" | "title" | "-title";
    courseId?: string;
    dateMin?: Dayjs;
    dateMax?: Dayjs;
}

export type IFetchStudentExamResponse = PaginatedResponse<StudentExamApprox[]>;

const useFetchStudentExamListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "-date",
        search,
        pageSize,
        courseId,
        dateMax,
        dateMin,
    }: IFetchStudentExamData = {}, page = 1): Promise<IFetchStudentExamResponse> => {
        const {data} = await instance.get(buildUrl("/exam/"), {
            params: {
                search,
                ordering,
                page,
                pageSize,
                course: courseId,
                date__gte: lazyDatetime(dateMin, "date"),
                date__lte: lazyDatetime(dateMax, "date"),
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseStudentExamApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentExamListAPI;
