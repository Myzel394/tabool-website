import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {HomeworkDetail} from "types";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseHomework from "./parseHomework";

export interface ISendHomeworkData {
    lesson: string;
    isPrivate: boolean;
    dueDate?: Dayjs | null;
    information?: string | null;
    type?: string | null;
}

export type ISendHomeworkResponse = HomeworkDetail;

const useSendHomeworkAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        dueDate,
        information,
        isPrivate,
        lesson,
        type,
    }: ISendHomeworkData): Promise<ISendHomeworkResponse> => {
        const {data} = await instance.post("/api/data/homework/", {
            dueDate: lazyDatetime(dueDate),
            information,
            isPrivate,
            lesson,
            type,
        }, await getLoginConfig());
        await parseHomework(data);

        return data;
    }, [instance]);
};

export default useSendHomeworkAPI;
