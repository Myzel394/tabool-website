import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {CourseApprox, FetchListData, PaginatedResponse} from "types";

import parseCourseApprox from "./parseCourseApprox";

export interface IFetchCourseListData extends FetchListData {
}

export type IFetchCourseListResponse = PaginatedResponse<CourseApprox[]>;

const useFetchCourseListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        search,
    }: IFetchCourseListData = {}, page = 1): Promise<IFetchCourseListResponse> => {
        const {data} = await instance.get("/api/data/course/", {
            ...await getLoginConfig(),
            params: {
                search,
                page,
            },
        });

        await Promise.allSettled(data.results.map(parseCourseApprox));

        return data;
    }, [instance]);
};

export default useFetchCourseListAPI;
