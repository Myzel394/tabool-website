import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherExamDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherExamDetail from "./parseTeacherExamDetail";

export interface IUpdateTeacherExamData {
    date: Dayjs;
    title: string;
    information: string | null;
}

const useUpdateTeacherExamAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        date,
        information,
        title,
    }: IUpdateTeacherExamData): Promise<TeacherExamDetail> => {
        const {data} = await instance.patch(buildUrl(`/exam/${id}/`), {
            title,
            information,
            date: lazyDatetime(date, "date"),
        }, await getLoginConfig());

        await parseTeacherExamDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateTeacherExamAPI;
