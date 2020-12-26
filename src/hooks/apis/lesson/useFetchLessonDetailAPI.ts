import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {LessonDetail} from "types";
import {getLoginConfig} from "api";

import parseLesson from "./parseLesson";


const useFetchLessonDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<LessonDetail> => {
        const {data} = await instance.get(`/api/data/lesson/${id}/`, await getLoginConfig());
        await parseLesson(data);

        return data;
    }, [instance]);
};

export default useFetchLessonDetailAPI;
