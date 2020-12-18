import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail} from "types";
import {getLoginConfig} from "api";

import parseHomework from "./parseHomework";

export interface IUpdateHomeworkDataData {
    id: string;
    information?: string;
    dueDate?: string;
    type?: string;
    isPrivate?: boolean;
}

export type IUpdateHomeworkDataResponse = HomeworkDetail;

const useUpdateHomeworkDataAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        id,
        dueDate,
        information,
        type,
        isPrivate,
    }: IUpdateHomeworkDataData): Promise<IUpdateHomeworkDataResponse> => {
        const {data} = await instance.patch(`/api/data/homework/${id}/`, {
            dueDate,
            information,
            type,
            isPrivate,
        }, await getLoginConfig());

        await parseHomework(data);

        return data;
    }, [instance]);
};

export default useUpdateHomeworkDataAPI;
