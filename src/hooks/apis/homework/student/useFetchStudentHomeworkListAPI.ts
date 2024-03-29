/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentHomeworkApprox} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentHomeworkApprox from "./parseStudentHomeworkApprox";

export interface IFetchStudentHomeworkData extends FetchListData {
    ordering?: "due_date" | "-due_date";
    dueDateMin?: Dayjs;
    dueDateMax?: Dayjs;
    courseId?: string;
    type?: string;
}

export type IFetchStudentHomeworkResponse = PaginatedResponse<StudentHomeworkApprox[]>;

const useFetchStudentHomeworkListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        courseId,
        dueDateMax,
        dueDateMin,
        search,
        type,
        ordering,
    }: IFetchStudentHomeworkData = {}, page = 1): Promise<IFetchStudentHomeworkResponse> => {
        const {data} = await instance.get(buildUrl("/homework/"), {
            params: {
                page,
                pageSize,
                search,
                type,
                ordering,
                course: courseId,
                due_date__gte: dueDateMin ? lazyDatetime(dueDateMin) : undefined,
                due_date__lte: dueDateMax ? lazyDatetime(dueDateMax) : undefined,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseStudentHomeworkApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentHomeworkListAPI;
