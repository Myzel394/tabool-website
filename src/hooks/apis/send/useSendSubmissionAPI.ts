import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {SubmissionDetail} from "types";
import {getLoginConfig} from "api";
import update from "immutability-helper";

export interface SingleData {
    lessonId: string;
    file: File;

    privatize?: boolean;
    uploadAt?: string;
}

export type ISendSubmissionData = SingleData | SingleData[];

export type ISendSubmissionResponse = SubmissionDetail | SubmissionDetail[];

interface SendData {
    lessonId: string;
    file: string;

    privatize?: boolean;
    uploadAt?: string;
}

const getFileData = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = event => {
            const result = event?.target?.result;

            if (typeof result === "string") {
                resolve(result);
            } else {
                reject();
            }
        };
        reader.onerror = reject;

        reader.readAsText(file[0]);
    });

const getFormData = async (data: SingleData): Promise<SendData> => ({
    lessonId: data.lessonId,
    privatize: data.privatize,
    uploadAt: data.uploadAt,
    file: await getFileData(data.file),
});

const useSendSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (rawSendData: ISendSubmissionData): Promise<ISendSubmissionResponse> => {
        const sendDataArray = Array.isArray(rawSendData) ? rawSendData : [rawSendData];
        const formData = await Promise.allSettled(
            sendDataArray.map(getFormData),
        );
        console.log(formData);

        const {data} = await instance.post(
            "/api/data/submission/",
            formData,
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
