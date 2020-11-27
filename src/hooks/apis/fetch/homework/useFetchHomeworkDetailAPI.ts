import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail} from "types";
import {convertToDate, getLoginConfig} from "api";

import {parseLesson} from "../lesson";

export const parseHomework = (data: HomeworkDetail): void => {
    convertToDate(data, [
        "dueDate",
        "createdAt",
    ]);
    if (data.lesson) {
        parseLesson(data.lesson);
    }
};

const useFetchHomeworkDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<HomeworkDetail> => {
        const {data} = await instance.get(`/api/data/homework/${id}/`, await getLoginConfig());
        parseHomework(data);

        return data;
    }, [instance]);
};

export default useFetchHomeworkDetailAPI;
