import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherHomeworkDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherHomeworkDetail from "./parseTeacherHomeworkDetail";

export interface IUpdateTeacherHomeworkData {
    type?: string | null;
    information?: string | null;
    dueDate?: Dayjs | null;
    privateToStudentId?: string | null;
}

const useUpdateTeacherHomeworkAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        dueDate,
        information,
        type,
        privateToStudentId,
    }: IUpdateTeacherHomeworkData): Promise<TeacherHomeworkDetail> => {
        const {data} = await instance.patch(buildUrl(`/homework/${id}/`), {
            information,
            type,
            dueDate: dueDate === undefined ? undefined : lazyDatetime(dueDate, "date"),
            privateToStudent: privateToStudentId,
        }, await getLoginConfig());

        await parseTeacherHomeworkDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateTeacherHomeworkAPI;
