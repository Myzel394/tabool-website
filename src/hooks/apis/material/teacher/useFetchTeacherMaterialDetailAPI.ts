import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {TeacherMaterialDetail} from "types";
import {getLoginConfig} from "api";

import parseTeacherMaterialDetail from "./parseTeacherMaterialDetail";

const useFetchTeacherMaterialDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<TeacherMaterialDetail> => {
        const {data} = await instance.get(buildUrl(`/material/${id}/`), await getLoginConfig());

        await parseTeacherMaterialDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherMaterialDetailAPI;
