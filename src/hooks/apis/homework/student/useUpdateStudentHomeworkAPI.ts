import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentHomeworkDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentHomeworkDetail from "./parseStudentHomeworkDetail";

export interface IUpdateStudentHomeworkData {
    type?: string | null;
    information?: string | null;
    dueDate?: Dayjs | null;
}

const useUpdateStudentHomeworkAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        dueDate,
        information,
        type,
    }: IUpdateStudentHomeworkData): Promise<StudentHomeworkDetail> => {
        const {data} = await instance.patch(buildUrl(`/homework/${id}/`), {
            information,
            type,
            dueDate: dueDate === undefined ? undefined : lazyDatetime(dueDate),
        }, await getLoginConfig());

        await parseStudentHomeworkDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateStudentHomeworkAPI;
