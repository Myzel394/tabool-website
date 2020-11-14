import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {MaterialDetail} from "types";
import {convertToDate, getLoginConfig} from "api";

export const parseMaterial = (data: MaterialDetail): void => {
    convertToDate(data, ["addedAt"]);
};

const useFetchMaterialDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<MaterialDetail> => {
        const {data} = await instance.get(`/api/data/material/${id}/`, await getLoginConfig());
        parseMaterial(data);

        return data;
    }, [instance]);
};

export default useFetchMaterialDetailAPI;
