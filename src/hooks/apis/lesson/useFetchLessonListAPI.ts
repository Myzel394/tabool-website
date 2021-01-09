/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {FetchListData, LessonApprox, PaginatedResponse} from "types";

import parseLessonApprox from "./parseLessonApprox";

export interface IFetchLessonsData extends FetchListData {
    dateMin?: string;
    dateMax?: string;
}

export type IFetchLessonsResponse = PaginatedResponse<LessonApprox[]>;

const useFetchLessonListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        dateMin,
        dateMax,
        search,
    }: IFetchLessonsData = {}, page = 1): Promise<IFetchLessonsResponse> => {
        const {data} = await instance.get("/api/data/lesson/", {
            params: {
                page,
                date__gte: dateMin,
                date__lte: dateMax,
            },
            ...await getLoginConfig(),
        });
        await Promise.allSettled(data.results.map(parseLessonApprox));

        return data;
    }, [instance]);
};

export default useFetchLessonListAPI;
