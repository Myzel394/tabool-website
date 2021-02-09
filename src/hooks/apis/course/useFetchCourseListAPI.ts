import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {CourseApprox, FetchListData, PaginatedResponse} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseCourseApprox from "./parseCourseApprox";

export interface IFetchCourseData extends FetchListData {
}

export type IFetchCourseResponse = PaginatedResponse<CourseApprox[]>;


const useFetchCourseListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        search,
        pageSize,
    }: IFetchCourseData = {}, page = 1): Promise<IFetchCourseResponse> => {
        const {data} = await instance.get(buildUrl("/course/"), {
            params: {
                search,
                page,
                pageSize,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parseCourseApprox));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchCourseListAPI;
