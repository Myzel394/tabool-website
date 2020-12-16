/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ExamApprox, FetchListData, PaginatedResponse} from "types";
import {getLoginConfig} from "api";

import parseExamApprox from "./parseExamApprox";

export interface IFetchClasstestListData extends FetchListData {
    ordering?: "targeted_date" | "-targeted_date";
    targetedDateMin?: string;
    targetedDateMax?: string;
    targetedDate?: string;
    courseId?: string;
    subjectId?: string;
}

export type IFetchClasstestListResponse = PaginatedResponse<ExamApprox[]>;

const useFetchExamListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        courseId,
        ordering,
        subjectId,
        targetedDate,
        targetedDateMax,
        targetedDateMin,
        search,
    }: IFetchClasstestListData = {}, page = 1): Promise<IFetchClasstestListResponse> => {
        const {data} = await instance.get("/api/data/exam/", {
            params: {
                search,
                page,
                ordering,
                course: courseId,
                subject: subjectId,
                ...(
                    targetedDate ? {
                        targeted_date__exact: targetedDate,
                    } : {
                        targeted_date__gte: targetedDateMin,
                        targeted_date__lte: targetedDateMax,
                    }
                ),
            },
            ...await getLoginConfig(),
        });
        data.results.forEach(parseExamApprox);

        return data;
    }, [instance]);
};

export default useFetchExamListAPI;
