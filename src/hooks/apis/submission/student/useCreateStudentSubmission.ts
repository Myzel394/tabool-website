import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentSubmissionDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import update from "immutability-helper";
import {lazyDatetime} from "utils";

import parseStudentSubmissionDetail from "./parseStudentSubmissionDetail";

export interface ICreateStudentSubmissionData {
    lessonId: string;
    lessonDate: Dayjs;
    file: Blob;
    name: string;
    publishDatetime: Dayjs | null;
}

export type ProgressFunction = (progress: number) => any;

const useCreateStudentSubmission = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
        file,
        name,
        publishDatetime,
    }: ICreateStudentSubmissionData, onProgress?: ProgressFunction): Promise<StudentSubmissionDetail> => {
        const formData = new FormData();
        formData.append("file", file, name);
        formData.set("lesson", lessonId);
        formData.set("lesson_date", lazyDatetime(lessonDate, "date"));

        if (publishDatetime) {
            formData.set("publish_datetime", lazyDatetime(publishDatetime));
        }

        const {data} = await instance.post(
            buildUrl("/submission/"),
            formData,
            update(await getLoginConfig(), {
                headers: {
                    "Content-Type": {
                        $set: "multipart/form-data",
                    },
                },
                onUploadProgress: {
                    $set: event => onProgress?.(event.loaded / event.total)
                    ,
                },
            }),
        );

        await parseStudentSubmissionDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateStudentSubmission;
