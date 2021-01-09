import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {Dayjs} from "dayjs";
import {ExamDetail} from "types";
import {getLoginConfig} from "api";
import {lazyDatetime} from "utils";

import parseExam from "./parseExam";

export interface IUpdateExamData {
    targetedDate: Dayjs;

    information?: string | null;
    roomId?: string | null;
}

export type IUpdateExamResponse = ExamDetail;

const useUpdateExamAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        information,
        roomId,
        targetedDate,
    }: IUpdateExamData): Promise<IUpdateExamResponse> => {
        const {data} = await instance.patch(`/api/data/exam/${id}/`, {
            room: roomId,
            targetedDate: lazyDatetime(targetedDate, "date"),
            information,
        }, await getLoginConfig());

        await parseExam(data);

        return data;
    }, [instance]);
};

export default useUpdateExamAPI;
