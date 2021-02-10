import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherSubmissionDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherSubmissionDetail from "./parseTeacherSubmissionDetail";

const useFetchTeacherSubmissionDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherSubmissionDetail> => {
        const {data} = await instance.get(buildUrl(`/submission/${id}/`), await getLoginConfig());

        await parseTeacherSubmissionDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherSubmissionDetailAPI;
