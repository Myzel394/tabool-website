import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {LessonDataDetail} from "types";
import {getLoginConfig} from "api";

export type IFetchLessonDataResponse = LessonDataDetail[];

const useFetchLessonDataAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchLessonDataResponse> => {
        const {data} = await instance.get("/api/data/lesson/lesson-data/", await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchLessonDataAPI;
