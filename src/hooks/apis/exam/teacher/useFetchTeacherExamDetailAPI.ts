import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherExamDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherExamDetail from "./parseTeacherExamDetail";

const useFetchTeacherExamDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherExamDetail> => {
        const {data} = await instance.get(buildUrl(`/exam/${id}/`), await getLoginConfig());

        await parseTeacherExamDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherExamDetailAPI;
