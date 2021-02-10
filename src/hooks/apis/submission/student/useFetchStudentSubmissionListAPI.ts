/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentSubmissionDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";

import parseStudentSubmissionDetail from "./parseStudentSubmissionDetail";

export interface IFetchStudentSubmissionData extends FetchListData {
    publishDatetimeMin?: Dayjs;
    publishDatetimeMax?: Dayjs;
    courseId?: string;
}

export type IFetchStudentSubmissionResponse = PaginatedResponse<StudentSubmissionDetail[]>;

const useFetchStudentSubmissionListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        courseId,
        search,
        publishDatetimeMax,
        publishDatetimeMin,
    }: IFetchStudentSubmissionData = {}, page = 1): Promise<IFetchStudentSubmissionResponse> => {
        const {data} = await instance.get(buildUrl("/submission/"), {
            params: {
                page,
                pageSize,
                search,
                course: courseId,
                publish_datetime__gte: publishDatetimeMin,
                publish_datetime__lte: publishDatetimeMax,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseStudentSubmissionDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentSubmissionListAPI;
