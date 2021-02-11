import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherLessonView} from "types";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherLesson from "./parseTeacherLesson";

export interface IFetchTeacherLessonData {
    lessonId: string;
    lessonDate: Dayjs;
}

const useFetchTeacherLessonAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
    }: IFetchTeacherLessonData): Promise<TeacherLessonView> => {
        const {data} = await instance.get(buildUrl("/lesson/"), {
            params: {
                lesson: lessonId,
                lessonDate: lazyDatetime(lessonDate, "date"),
            },
            ...await getLoginConfig(),
        });

        await parseTeacherLesson(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherLessonAPI;
