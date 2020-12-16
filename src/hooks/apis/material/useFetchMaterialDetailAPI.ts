import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {MaterialDetail} from "types";
import {getLoginConfig} from "api";

import parseMaterial from "./parseMaterial";

const useFetchMaterialDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<MaterialDetail> => {
        const {data} = await instance.get(`/api/data/material/${id}/`, await getLoginConfig());
        parseMaterial(data);

        return data;
    }, [instance]);
};

export default useFetchMaterialDetailAPI;
