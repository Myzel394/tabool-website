import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentHomeworkDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentHomeworkDetail from "./parseStudentHomeworkDetail";

export interface ICreateStudentHomeworkData {
    lessonId: string;
    lessonDate: Dayjs;

    type?: string | null;
    information?: string | null;
    dueDate?: Dayjs | null;
}

const useCreateStudentHomeworkAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
        dueDate,
        information,
        type,
    }: ICreateStudentHomeworkData): Promise<StudentHomeworkDetail> => {
        const {data} = await instance.post(buildUrl("/homework/"), {
            lessonDate,
            information,
            type,
            dueDate: dueDate ? lazyDatetime(dueDate, "date") : undefined,
            lesson: lessonId,
        }, await getLoginConfig());

        await parseStudentHomeworkDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateStudentHomeworkAPI;
