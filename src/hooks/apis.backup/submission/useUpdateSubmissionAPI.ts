import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {SubmissionDetail} from "types";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseSubmission from "./parseSubmission";

export interface IUpdateSubmissionData {
    uploadDate?: Dayjs | null;
    privatize?: boolean;
}

export type IUpdateSubmissionResponse = SubmissionDetail;

const useUpdateSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        privatize,
        uploadDate,
    }: IUpdateSubmissionData): Promise<IUpdateSubmissionResponse> => {
        const {data} = await instance.patch(`/api/data/submission/${id}/`, {
            privatize,
            uploadDate: lazyDatetime(uploadDate),
        }, await getLoginConfig());
        await parseSubmission(data);

        return data;
    }, [instance]);
};

export default useUpdateSubmissionAPI;
