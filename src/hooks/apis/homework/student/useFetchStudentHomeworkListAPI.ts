/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentHomeworkApprox} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";

import parseStudentHomeworkApprox from "./parseStudentHomeworkApprox";

export interface IFetchStudentHomeworkData extends FetchListData {
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
    }: IFetchStudentHomeworkData = {}, page = 1): Promise<IFetchStudentHomeworkResponse> => {
        const {data} = await instance.get(buildUrl("/homework/"), {
            params: {
                page,
                pageSize,
                search,
                type,
                course: courseId,
                due_date__gte: dueDateMin,
                due_date__lte: dueDateMax,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseStudentHomeworkApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentHomeworkListAPI;