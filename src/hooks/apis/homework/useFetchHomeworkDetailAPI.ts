import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {HomeworkDetail} from "types";
import {getLoginConfig} from "api";

import parseHomework from "./parseHomework";

const useFetchHomeworkDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<HomeworkDetail> => {
        const {data} = await instance.get(`/api/data/homework/${id}/`, await getLoginConfig());
        parseHomework(data);

        return data;
    }, [instance]);
};

export default useFetchHomeworkDetailAPI;
