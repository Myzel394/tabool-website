import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentHomeworkDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentHomeworkDetail from "./parseStudentHomeworkDetail";

const useFetchStudentHomeworkDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentHomeworkDetail> => {
        const {data} = await instance.get(buildUrl(`/homework/${id}/`), await getLoginConfig());

        await parseStudentHomeworkDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentHomeworkDetailAPI;
