import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Absence} from "types";

import {parseLesson} from "../lesson";

const useFetchAbsenceListAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Absence> => {
        const {data} = await instance.get(`/api/data/lesson-absence/${id}/`, await getLoginConfig());
        await parseLesson(data.lesson);

        return data;
    }, [instance]);
};

export default useFetchAbsenceListAPI;
