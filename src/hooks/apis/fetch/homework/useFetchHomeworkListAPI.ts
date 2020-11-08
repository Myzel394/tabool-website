/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Dayjs} from "dayjs";
import {FetchListData, HomeworkApprox, PaginatedResponse} from "types";
import {convertToDate, getLoginConfig} from "api";

export interface IFetchHomeworkListData extends FetchListData {
    dueDateMax?: Dayjs;
    dueDateMin?: Dayjs;
    type?: string;
    lessonId?: string;
    subjectId?: string;
    completed?: boolean;
    ignore?: boolean;
    ordering?: "due_date" | "-due_date";
}

export type IFetchHomeworkListResponse = PaginatedResponse<HomeworkApprox[]>;

const useFetchHomeworkListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        ordering = "due_date",
        dueDateMax,
        dueDateMin,
        type,
        lessonId,
        subjectId,
        completed,
        ignore,
        page,
        search,
    }: IFetchHomeworkListData = {}): Promise<IFetchHomeworkListResponse> => {
        const {data} = await instance.get("/api/data/homework/", {
            params: {
                search,
                ignore,
                completed,
                type,
                ordering,
                page,
                lesson: lessonId,
                subject: subjectId,
                due_date__lte: dueDateMin,
                due_date__gte: dueDateMax,
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(element => convertToDate(element, ["dueDate"]));

        return data;
    }, [instance]);
};

export default useFetchHomeworkListAPI;
