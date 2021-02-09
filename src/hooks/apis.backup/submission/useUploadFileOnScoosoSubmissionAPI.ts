import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig, UploadStatus} from "api";

export interface IUploadFileOnScoosoSubmissionResponse {
    uploadStatus: UploadStatus;
}

const useUploadFileOnScoosoSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (submissionId: string): Promise<IUploadFileOnScoosoSubmissionResponse> => {
        const {data} = await instance.post(`/api/data/submission/${submissionId}/upload/`, {}, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useUploadFileOnScoosoSubmissionAPI;
