import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentSubmissionDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseStudentSubmissionDetail from "./parseStudentSubmissionDetail";

export interface IUpdateStudentSubmissionData {
    publishDatetime?: Dayjs;
}

const useUpdateStudentSubmissionAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        publishDatetime,
    }: IUpdateStudentSubmissionData): Promise<StudentSubmissionDetail> => {
        const {data} = await instance.patch(buildUrl(`/submission/${id}/`), {
            publishDatetime: publishDatetime === undefined ? undefined : lazyDatetime(publishDatetime),
        }, await getLoginConfig());

        await parseStudentSubmissionDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateStudentSubmissionAPI;
