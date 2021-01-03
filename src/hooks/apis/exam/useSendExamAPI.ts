import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {ExamDetail} from "types";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseExam from "./parseExam";

export interface ISendExamData {
    courseId: string;
    targetedDate: Dayjs;

    information?: string | null;
    roomId?: string | null;
}

export type ISendExamResponse = ExamDetail;

const useSendExamAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        courseId,
        information,
        roomId,
        targetedDate,
    }: ISendExamData): Promise<ISendExamResponse> => {
        const {data} = await instance.post("/api/data/exam/", {
            course: courseId,
            room: roomId,
            targetedDate: lazyDatetime(targetedDate, "date"),
            information,
        }, await getLoginConfig());

        parseExam(data);

        return data;
    }, [instance]);
};

export default useSendExamAPI;
