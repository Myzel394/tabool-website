import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail} from "types";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseHomework from "./parseHomework";

export interface IUpdateHomeworkDataData {
    information?: string | null;
    dueDate?: Dayjs | null;
    type?: string | null;
    isPrivate?: boolean;
}

export type IUpdateHomeworkDataResponse = HomeworkDetail;

const useUpdateHomeworkDataAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        dueDate,
        information,
        type,
        isPrivate,
    }: IUpdateHomeworkDataData): Promise<IUpdateHomeworkDataResponse> => {
        const {data} = await instance.patch(`/api/data/homework/${id}/`, {
            dueDate: lazyDatetime(dueDate),
            information,
            type,
            isPrivate,
        }, await getLoginConfig());

        await parseHomework(data);

        return data;
    }, [instance]);
};

export default useUpdateHomeworkDataAPI;
