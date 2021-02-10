import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {StudentMaterialDetail} from "types";
import {getLoginConfig} from "api";

import parseStudentMaterialDetail from "./parseStudentMaterialDetail";

const useFetchStudentMaterialDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<StudentMaterialDetail> => {
        const {data} = await instance.get(buildUrl(`/material/${id}/`), await getLoginConfig());

        await parseStudentMaterialDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentMaterialDetailAPI;
