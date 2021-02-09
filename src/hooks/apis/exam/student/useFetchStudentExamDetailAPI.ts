import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentExamDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentExamDetail from "./parseStudentExamDetail";

const useFetchStudentExamDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentExamDetail> => {
        const {data} = await instance.get(buildUrl(`/exam/${id}/`), await getLoginConfig());

        await parseStudentExamDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentExamDetailAPI;
