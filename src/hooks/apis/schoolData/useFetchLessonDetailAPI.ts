import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {LessonDetail} from "types";
import {fetchIdsToObject} from "utils";
import {getLoginConfig} from "api";
import {parseDate} from "utils/parsers";

import useFetchRoomDetailAPI from "./useFetchRoomDetailAPI";
import useFetchCourseDetailAPI from "./useFetchCourseDetailAPI";

const useFetchLessonDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchRoom = useFetchRoomDetailAPI();
    const fetchCourse = useFetchCourseDetailAPI();

    return useCallback(async (id: string): Promise<LessonDetail> => {
        const {data} = await instance.get(`/api/data/lesson/${id}/`, await getLoginConfig());
        const lesson = data;
        lesson.lessonData = await fetchIdsToObject(lesson.lessonData, {
            room: id => fetchRoom(id),
            course: id => fetchCourse(id),
        });
        parseDate(lesson, [
            "date", "lessonData.startTime", "lessonData.endTime",
        ]);

        return lesson;
    }, [fetchCourse, fetchRoom, instance]);
};

export default useFetchLessonDetailAPI;
