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
    file: File;
    name: string;
    publishDatetime: Dayjs;
}

const useCreateStudentSubmission = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
        file,
        name,
        publishDatetime,
    }: ICreateStudentSubmissionData): Promise<StudentSubmissionDetail> => {
        const {data} = await instance.post(buildUrl("/submission/"), {
            file,
            name,
            lessonDate: lazyDatetime(lessonDate, "date"),
            publishDatetime: publishDatetime === undefined ? undefined : lazyDatetime(publishDatetime),
            lesson: lessonId,
        }, update(await getLoginConfig(), {
            headers: {
                "Content-Type": {
                    $set: "multipart/form-data",
                },
            },
        }));

        await parseStudentSubmissionDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateStudentSubmission;
