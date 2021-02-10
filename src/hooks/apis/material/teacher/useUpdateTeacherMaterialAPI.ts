import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherMaterialDetail} from "types";
import getLoginConfig from "api/getLoginConfig";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";

import parseTeacherMaterialDetail from "./parseTeacherMaterialDetail";

export interface IUpdateTeacherHomeworkData {
    publishDatetime?: Dayjs;
    announce?: boolean;
}

const useUpdateTeacherMaterialAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        announce,
        publishDatetime,
    }: IUpdateTeacherHomeworkData): Promise<TeacherMaterialDetail> => {
        const {data} = await instance.patch(buildUrl(`/material/${id}/`), {
            announce,
            publishDatetime: publishDatetime === undefined ? undefined : lazyDatetime(publishDatetime, "date"),
        }, await getLoginConfig());

        await parseTeacherMaterialDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateTeacherMaterialAPI;
