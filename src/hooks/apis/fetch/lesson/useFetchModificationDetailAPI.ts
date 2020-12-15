import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ModificationDetail} from "types/modification";
import {convertToDate, getLoginConfig} from "api";

import {parseLesson} from "./useFetchLessonDetailAPI";

export const parseModification = (data: ModificationDetail): void => {
    convertToDate(data, ["startDatetime", "endDatetime"]);
    if (data.lesson) {
        parseLesson(data.lesson);
    }
};


const useFetchModificationDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<ModificationDetail> => {
        const {data} = await instance.get(`/api/data/modification/${id}/`, await getLoginConfig());
        parseModification(data);

        return data;
    }, [instance]);
};

export default useFetchModificationDetailAPI;
