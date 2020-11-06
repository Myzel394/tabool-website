import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ClasstestDetail, HomeworkDetail} from "types";
import {fetchIdsToObject} from "utils";
import {parseDate} from "utils/parsers";
import {getLoginConfig} from "api";

import {useFetchCourseDetailAPI, useFetchRoomDetailAPI} from "../schoolData";

const useFetchClasstestDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchCourse = useFetchCourseDetailAPI();
    const fetchRoom = useFetchRoomDetailAPI();

    return useCallback(async (id: string): Promise<ClasstestDetail> => {
        let {data} = await instance.get(`/api/data/classtest/${id}/`, await getLoginConfig());
        data = await fetchIdsToObject(data, {
            course: id => fetchCourse(id),
            room: id => id && fetchRoom(id),
        });
        parseDate(data, [
            "targetedDate",
            "createdAt",
        ]);

        return data;
    }, [fetchCourse, fetchRoom, instance]);
};

export default useFetchClasstestDetailAPI;
