import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherHomeworkDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherHomeworkDetail from "./parseTeacherHomeworkDetail";

export interface ICreateTeacherHomeworkData {
    lessonId: string;
    lessonDate: Dayjs;

    type?: string | null;
    information?: string | null;
    dueDate?: Dayjs | null;
    privateToStudentId?: string | null;
}

const useCreateTeacherHomeworkAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
        dueDate,
        information,
        type,
        privateToStudentId,
    }: ICreateTeacherHomeworkData): Promise<TeacherHomeworkDetail> => {
        const {data} = await instance.post(buildUrl("/homework/"), {
            lessonDate,
            information,
            type,
            dueDate: dueDate ? lazyDatetime(dueDate, "date") : undefined,
            lesson: lessonId,
            privateToStudent: privateToStudentId,
        }, await getLoginConfig());

        await parseTeacherHomeworkDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateTeacherHomeworkAPI;
