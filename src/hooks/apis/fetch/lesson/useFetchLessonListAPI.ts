/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {convertToDate, getLoginConfig} from "api";
import {FetchListData, LessonApprox, PaginatedResponse} from "types";

export interface IFetchLessonsData extends FetchListData {
    dateMin?: string;
    dateMax?: string;
}

export type IFetchLessonsResponse = PaginatedResponse<LessonApprox[]>;

const useFetchLessonListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        dateMin,
        dateMax,
        page,
    }: IFetchLessonsData = {}): Promise<IFetchLessonsResponse> => {
        const {data} = await instance.get("/api/data/lesson/", {
            params: {
                page,
                date__gte: dateMin,
                date__lte: dateMax,
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["lessonData.date"]));

        return data;
    }, [instance]);
};

export default useFetchLessonListAPI;
