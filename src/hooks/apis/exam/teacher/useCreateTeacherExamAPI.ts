import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherExamDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";

import {lazyDatetime} from "../../../../utils";

import parseTeacherExamDetail from "./parseTeacherExamDetail";

export interface ICreateTeacherExamData {
    courseId: string;
    date: Dayjs;
    title: string;
    information: string | null;
}

const useCreateTeacherExamAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        courseId,
        date,
        information,
        title,
    }: ICreateTeacherExamData): Promise<TeacherExamDetail> => {
        const {data} = await instance.post(buildUrl("/exam/"), {
            title,
            information,
            date: lazyDatetime(date, "date"),
            course: courseId,
        }, await getLoginConfig());

        await parseTeacherExamDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateTeacherExamAPI;
