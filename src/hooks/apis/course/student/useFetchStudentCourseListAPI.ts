import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, StudentCourseDetail} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseStudentCourseDetail from "./parseStudentCourseDetail";

export interface IFetchStudentCourseData extends FetchListData {
}

export type IFetchStudentCourseResponse = PaginatedResponse<StudentCourseDetail[]>;


const useFetchStudentCourseListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        search,
        pageSize,
    }: IFetchStudentCourseData = {}, page = 1): Promise<IFetchStudentCourseResponse> => {
        const {data} = await instance.get(buildUrl("/course/"), {
            params: {
                search,
                page,
                pageSize,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseStudentCourseDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentCourseListAPI;
