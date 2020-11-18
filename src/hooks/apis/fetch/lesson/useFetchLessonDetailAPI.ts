import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {LessonDetail} from "types";
import {convertToDate, getLoginConfig} from "api";

import {parseCourse} from "../schoolData";

export const parseLesson = (data: LessonDetail) => {
    convertToDate(data, [
        "date", "lessonData.startTime", "lessonData.endTime",
    ]);
    if (data.lessonData) {
        parseCourse(data.lessonData.course);
    }
};

const useFetchLessonDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<LessonDetail> => {
        const {data} = await instance.get(`/api/data/lesson/${id}/`, await getLoginConfig());
        parseLesson(data);

        return data;
    }, [instance]);
};

export default useFetchLessonDetailAPI;
