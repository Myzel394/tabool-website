import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {SubmissionDetail} from "types";
import {parseDate} from "utils/parsers";
import {getLoginConfig} from "api";
import {fetchIdsToObject} from "utils";

import useFetchLessonDetailAPI from "../lesson/useFetchLessonDetailAPI";

const useFetchMaterialDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchLesson = useFetchLessonDetailAPI();

    return useCallback(async (key: string, id: string): Promise<SubmissionDetail> => {
        let {data} = await instance.get(`/api/data/submission/${id}/`, await getLoginConfig());
        data = await fetchIdsToObject(data, {
            lesson: lessonId => fetchLesson(`lesson_${lessonId}`, lessonId),
        });
        parseDate(data, ["uploadAt"]);

        return data;
    }, [fetchLesson, instance]);
};

export default useFetchMaterialDetailAPI;
