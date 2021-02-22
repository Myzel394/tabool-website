import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentLessonView} from "types";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentLesson from "./parseStudentLesson";

export interface IFetchStudentLessonData {
    lessonId: string;
    lessonDate: Dayjs;
}

const useFetchStudentLessonAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
    }: IFetchStudentLessonData): Promise<StudentLessonView> => {
        const config = await getLoginConfig();

        if (process.env.NODE_ENV === "production") {
            config.headers["no-cache"] = true;
        }

        const {data} = await instance.get(buildUrl("/lesson/"), {
            params: {
                lesson: lessonId,
                lessonDate: lazyDatetime(lessonDate, "date"),
            },
            ...config,
        });

        await parseStudentLesson(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentLessonAPI;
