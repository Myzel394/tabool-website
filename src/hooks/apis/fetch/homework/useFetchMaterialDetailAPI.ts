import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {MaterialDetail} from "types";
import {parseDate} from "utils/parsers";
import {getLoginConfig} from "api";

const useFetchMaterialDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<MaterialDetail> => {
        const {data} = await instance.get(`/api/data/material/${id}/`, await getLoginConfig());
        parseDate(data, ["addedAt"]);

        return data;
    }, [instance]);
};

export default useFetchMaterialDetailAPI;
