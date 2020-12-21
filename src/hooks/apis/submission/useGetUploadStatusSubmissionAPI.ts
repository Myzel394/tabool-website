import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig, UploadStatus} from "api";

export interface IGetUploadStatusSubmissionResponse {
    uploadStatus: UploadStatus;
}

const useGetUploadStatusSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (submissionId: string): Promise<IGetUploadStatusSubmissionResponse> => {
        const {data} = await instance.get(`/api/data/submission/${submissionId}/upload/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useGetUploadStatusSubmissionAPI;
