import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {SubmissionDetail} from "types";
import {getLoginConfig} from "api";
import update from "immutability-helper";

export interface SingleData {
    lessonId: string;
    file: Blob;

    privatize?: boolean;
    uploadDate?: string | null;
}

export type ISendSubmissionData = SingleData;

export type ISendSubmissionResponse = SubmissionDetail;

const useSendSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        file,
        uploadDate,
        privatize,
        lessonId,
    }: ISendSubmissionData): Promise<ISendSubmissionResponse> => {
        const {data} = await instance.post(
            "/api/data/submission/",
            {
                file,
                uploadDate,
                privatize,
                lesson: lessonId,
            },
            update(await getLoginConfig(), {
                headers: {
                    "Content-Type": {
                        $set: "multipart/form-data",
                    },
                },
            }),
        );
        return data;
    }, [instance]);
};

export default useSendSubmissionAPI;