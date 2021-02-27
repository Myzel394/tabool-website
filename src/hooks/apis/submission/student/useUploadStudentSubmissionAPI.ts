import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentSubmissionDetail} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseStudentSubmissionDetail from "./parseStudentSubmissionDetail";

const useUploadStudentSubmissionAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentSubmissionDetail> => {
        const {data} = await instance.post(buildUrl(`/submission/${id}/upload/`), {}, await getLoginConfig());

        await parseStudentSubmissionDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUploadStudentSubmissionAPI;
