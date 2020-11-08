import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail} from "types";
import {fetchIdsToObject} from "utils";
import {parseDate} from "utils/parsers";
import {getLoginConfig} from "api";

import useFetchLessonDetailAPI from "../lesson/useFetchLessonDetailAPI";

const useFetchHomeworkDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchLesson = useFetchLessonDetailAPI();

    return useCallback(async (key: string, id: string): Promise<HomeworkDetail> => {
        let {data} = await instance.get(`/api/data/homework/${id}/`, await getLoginConfig());
        data = await fetchIdsToObject(data, {
            lesson: lessonId => fetchLesson(`lesson_${lessonId}`, lessonId),
        });
        parseDate(data, [
            "dueDate",
            "createdAt",
        ]);

        return data;
    }, [fetchLesson, instance]);
};

export default useFetchHomeworkDetailAPI;
