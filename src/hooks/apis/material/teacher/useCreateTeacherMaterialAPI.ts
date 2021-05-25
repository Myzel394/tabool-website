import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ProgressFunction, TeacherMaterialDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import update from "immutability-helper";
import {lazyDatetime} from "utils";

import parseTeacherMaterialDetail from "./parseTeacherMaterialDetail";

export interface ICreateTeacherMaterialData {
    lessonId: string;
    lessonDate: Dayjs;
    file: Blob;
    name: string;
    publishDatetime: Dayjs;

    announce?: boolean;
}

const useCreateTeacherMaterialAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        lessonDate,
        lessonId,
        file,
        name,
        publishDatetime,
        announce,
    }: ICreateTeacherMaterialData, onProgress?: ProgressFunction): Promise<TeacherMaterialDetail> => {
        const formData = new FormData();
        formData.append("file", file, name);
        formData.set("name", name);
        formData.set("lesson", lessonId);
        formData.set("lesson_date", lazyDatetime(lessonDate, "date"));
        formData.set("publish_datetime", lazyDatetime(publishDatetime));

        if (announce) {
            formData.set("announce", announce.toString());
        }

        const {data} = await instance.post(
            buildUrl("/material/"),
            formData,
            update(await getLoginConfig(), {
                headers: {
                    "Content-Type": {
                        $set: "multipart/form-data",
                    },
                },
                onUploadProgress: {
                    $set: event => onProgress?.(event.loaded / event.total),
                },
            }),
        );

        await parseTeacherMaterialDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateTeacherMaterialAPI;
