import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherHomeworkDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherHomeworkDetail from "./parseTeacherHomeworkDetail";

const useFetchTeacherHomeworkDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherHomeworkDetail> => {
        const {data} = await instance.get(buildUrl(`/homework/${id}/`), await getLoginConfig());

        await parseTeacherHomeworkDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherHomeworkDetailAPI;
