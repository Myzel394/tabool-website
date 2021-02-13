import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, PaginatedResponse, TeacherCourseDetail} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseTeacherCourseDetail from "./parseTeacherCourseDetail";

export interface IFetchTeacherCourseData extends FetchListData {
}

export type IFetchTeacherCourseResponse = PaginatedResponse<TeacherCourseDetail[]>;


const useFetchTeacherCourseListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        search,
        pageSize,
    }: IFetchTeacherCourseData = {}, page = 1): Promise<IFetchTeacherCourseResponse> => {
        const {data} = await instance.get(buildUrl("/course/"), {
            params: {
                search,
                page,
                pageSize,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseTeacherCourseDetail));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherCourseListAPI;
