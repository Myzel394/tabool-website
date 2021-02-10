import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherMaterialDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import update from "immutability-helper";

import {lazyDatetime} from "../../../../utils";

import parseTeacherMaterialDetail from "./parseTeacherMaterialDetail";

export interface ICreateTeacherMaterialData {
    lessonId: string;
    lessonDate: Dayjs;
    file: File;
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
    }: ICreateTeacherMaterialData): Promise<TeacherMaterialDetail> => {
        const {data} = await instance.post(buildUrl("/material/"), {
            lessonDate,
            file,
            name,
            announce,
            publishDatetime: lazyDatetime(publishDatetime),
            lesson: lessonId,
        }, update(await getLoginConfig(), {
            headers: {
                "Content-Type": {
                    $set: "multipart/form-data",
                },
            },
        }));

        await parseTeacherMaterialDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useCreateTeacherMaterialAPI;
