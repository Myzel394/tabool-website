import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentMaterialDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentSubmissionDetail from "./parseStudentSubmissionDetail";

const useFetchStudentSubmissionDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentMaterialDetail> => {
        const {data} = await instance.get(buildUrl(`/submission/${id}/`), await getLoginConfig());

        await parseStudentSubmissionDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentSubmissionDetailAPI;
