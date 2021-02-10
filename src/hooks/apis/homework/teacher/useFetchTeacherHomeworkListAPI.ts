/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherHomeworkApprox} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";

import parseTeacherHomeworkApprox from "./parseTeacherHomeworkApprox";

export interface IFetchTeacherHomeworkData extends FetchListData {
    dueDateMin?: Dayjs;
    dueDateMax?: Dayjs;
    courseId?: string;
    type?: string;
}

export type IFetchTeacherHomeworkResponse = PaginatedResponse<TeacherHomeworkApprox[]>;

const useFetchTeacherHomeworkListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        courseId,
        dueDateMax,
        dueDateMin,
        search,
        type,
    }: IFetchTeacherHomeworkData = {}, page = 1): Promise<IFetchTeacherHomeworkResponse> => {
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

        await Promise.allSettled(data.results.map(parseTeacherHomeworkApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherHomeworkListAPI;
