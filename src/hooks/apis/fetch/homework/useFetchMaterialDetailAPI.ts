import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail, MaterialDetail} from "types";
import {parseDate} from "utils/parsers";
import {getLoginConfig} from "api";

import useFetchLessonDetailAPI from "../lesson/useFetchLessonDetailAPI";

const useFetchMaterialDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchLesson = useFetchLessonDetailAPI();

    return useCallback(async (id: string): Promise<MaterialDetail> => {
        const {data} = await instance.get(`/api/data/material/${id}/`, await getLoginConfig());
        parseDate(data, ["addedAt"])

        return data;
    }, [fetchLesson, instance]);
};

export default useFetchMaterialDetailAPI;
