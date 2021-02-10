import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherSubmissionDetail} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseTeacherSubmissionDetail from "./parseTeacherSubmissionDetail";

export interface IFetchTeacherSubmissionData extends FetchListData {
    courseId?: string;
}

export type IFetchTeacherSubmissionResponse = PaginatedResponse<TeacherSubmissionDetail[]>;

const useFetchTeacherSubmissionListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        pageSize,
        courseId,
        search,
    }: IFetchTeacherSubmissionData = {}, page = 1): Promise<IFetchTeacherSubmissionResponse> => {
        const {data} = await instance.get(buildUrl("/submission/"), {
            params: {
                page,
                pageSize,
                search,
                course: courseId,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseTeacherSubmissionDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherSubmissionListAPI;
