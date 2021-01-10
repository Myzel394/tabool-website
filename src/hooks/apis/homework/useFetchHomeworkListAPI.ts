/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, HomeworkApprox, PaginatedResponse} from "types";
import {getLoginConfig} from "api";

import parseHomeworkApprox from "./parseHomeworkApprox";

export type OrderingTypes = "due_date" | "-due_date";

export interface IFetchHomeworkListData extends FetchListData {
    dueDateMax?: string;
    dueDateMin?: string;
    type?: string;
    lessonId?: string;
    subjectId?: string;
    completed?: boolean;
    ignore?: boolean;
    ordering?: OrderingTypes;
}

export type IFetchHomeworkListResponse = PaginatedResponse<HomeworkApprox[]>;

const useFetchHomeworkListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        ordering = "due_date",
        dueDateMax,
        dueDateMin,
        type,
        lessonId,
        subjectId,
        completed,
        ignore,
        search,
    }: IFetchHomeworkListData = {}, page = 1): Promise<IFetchHomeworkListResponse> => {
        const {data} = await instance.get("/api/data/homework/", {
            params: {
                search,
                ignore,
                page,
                completed,
                type,
                ordering,
                lesson: lessonId,
                subject: subjectId,
                due_date__gte: dueDateMin,
                due_date__lte: dueDateMax,
            },
            ...await getLoginConfig(),
        });
        await Promise.allSettled(data.results.map(parseHomeworkApprox));

        return data;
    }, [instance]);
};

export default useFetchHomeworkListAPI;
