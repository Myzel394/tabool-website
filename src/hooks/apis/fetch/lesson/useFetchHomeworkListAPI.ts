/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Dayjs} from "dayjs";
import {HomeworkApprox, PaginatedResponse} from "types";
import {getLoginConfig} from "api";

export interface IFetchHomeworkListData {
    dueDateMax?: Dayjs;
    dueDateMin?: Dayjs;
    type?: string;
    lessonId?: string;
    subjectId?: string;
    completed?: boolean;
    ignore?: boolean;
    ordering?: string;
}

export type IFetchHomeworkListResponse = PaginatedResponse<HomeworkApprox>;

const useFetchHomeworkListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (search: string, {
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
                completed,
                type,
                ordering,
                lesson: lessonId,
                subject: subjectId,
                due_date__lte: dueDateMin,
                due_date__gte: dueDateMax,
            },
            ...await getLoginConfig(),
        });
        return data;
    }, [instance]);
};

export default useFetchHomeworkListAPI;
