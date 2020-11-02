/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {convertToDate, getLoginConfig} from "api";
import {LessonApprox, PaginatedResponse} from "types";

export interface IFetchLessonsData {
    startDate?: string;
    endDate?: string;
}

export type IFetchLessonsResponse = PaginatedResponse<LessonApprox[]>;

const useFetchLessonListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        startDate,
        endDate,
    }: IFetchLessonsData = {}): Promise<IFetchLessonsResponse> => {
        const {data} = await instance.get("/api/data/lesson/", {
            params: {
                date__gte: startDate,
                date__lte: endDate,
            },
            ...await getLoginConfig(),
        });
        convertToDate(data);

        return data;
    }, [instance]);
};

export default useFetchLessonListAPI;
