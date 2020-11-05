/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {convertToDate, getLoginConfig} from "api";
import {LessonApprox, PaginatedResponse} from "types";

export interface IFetchLessonsData {
    startDate?: string;
    endDate?: string;
    page?: string;
}

export type IFetchLessonsResponse = PaginatedResponse<LessonApprox[]>;

const useFetchLessonListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        startDate,
        endDate,
        page,
    }: IFetchLessonsData = {}): Promise<IFetchLessonsResponse> => {
        const {data} = await instance.get("/api/data/lesson/", {
            params: {
                page,
                date__gte: startDate,
                date__lte: endDate,
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["lessonData.date"]));

        return data;
    }, [instance]);
};

export default useFetchLessonListAPI;
