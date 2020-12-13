import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {LessonDetail} from "types";
import {convertToDate, getLoginConfig} from "api";

import {parseCourse} from "../schoolData";
import {parseHomework, parseMaterial} from "../homework";

import {parseModification} from "./useFetchModificationDetailAPI";

export const parseLesson = (data: LessonDetail) => {
    convertToDate(data, [
        "date", "lessonData.startTime", "lessonData.endTime",
    ]);
    if (data.lessonData) {
        parseCourse(data.lessonData.course);
    }
    data.materials.forEach(material => parseMaterial(material));
    data.homeworks.forEach(homework => parseHomework(homework));
    data.modifications.forEach(modification => parseModification(modification));
};

const useFetchLessonDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<LessonDetail> => {
        const {data} = await instance.get(`/api/data/lesson/${id}/`, await getLoginConfig());
        parseLesson(data);

        return data;
    }, [instance]);
};

export default useFetchLessonDetailAPI;
