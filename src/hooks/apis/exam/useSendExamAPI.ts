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
    placeId?: string | null;
}

export type ISendExamResponse = ExamDetail;

// TODO Add delete option to exam detail!
const useSendExamAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        courseId,
        information,
        placeId,
        targetedDate,
    }: ISendExamData): Promise<ISendExamResponse> => {
        const {data} = await instance.post("/api/data/exam/", {
            course: courseId,
            room: placeId,
            targetedDate: lazyDatetime(targetedDate, "date"),
            information,
        }, await getLoginConfig());

        await parseExam(data);

        return data;
    }, [instance]);
};

export default useSendExamAPI;
