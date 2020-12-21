import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {UploadStatus} from "api";

export interface IGetUploadStatusSubmissionResponse {
    uploadStatus: UploadStatus;
}

const useGetUploadStatusSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (submissionId: string): Promise<IGetUploadStatusSubmissionResponse> => {
        const {data} = await instance.get(`/api/data/submission/${submissionId}/upload/`);
        return data;
    }, [instance]);
};

export default useGetUploadStatusSubmissionAPI;
