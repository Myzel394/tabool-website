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

    return useCallback(async (search: string, page = 1, {
        ordering = "due_date",
        dueDateMax,
        dueDateMin,
        type,
        lessonId,
        subjectId,
        completed,
        ignore,
    }: IFetchHomeworkListData = {}): Promise<IFetchHomeworkListResponse> => {
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
        data.results.forEach(element => convertToDate(element, ["dueDate", "createdAt"]));

        return data;
    }, [instance]);
};

export default useFetchHomeworkListAPI;
