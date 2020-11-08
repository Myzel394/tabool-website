import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ClasstestDetail} from "types";
import {fetchIdsToObject} from "utils";
import {parseDate} from "utils/parsers";
import {getLoginConfig} from "api";

import {useFetchCourseDetailAPI, useFetchRoomDetailAPI} from "../schoolData";

const useFetchClasstestDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchCourse = useFetchCourseDetailAPI();
    const fetchRoom = useFetchRoomDetailAPI();

    return useCallback(async (key: string, id: string): Promise<ClasstestDetail> => {
        let {data} = await instance.get(`/api/data/classtest/${id}/`, await getLoginConfig());
        data = await fetchIdsToObject(data, {
            course: courseId => fetchCourse(`course_${courseId}`, courseId),
            room: roomId => roomId && fetchRoom(`room_${roomId}`, roomId),
        });
        parseDate(data, [
            "targetedDate",
            "createdAt",
        ]);

        return data;
    }, [fetchCourse, fetchRoom, instance]);
};

export default useFetchClasstestDetailAPI;
