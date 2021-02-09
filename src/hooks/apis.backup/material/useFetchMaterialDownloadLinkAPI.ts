import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IFetchMaterialDownloadLinkResponse {
    file?: string;
}

const useFetchMaterialDownloadLinkAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<IFetchMaterialDownloadLinkResponse> => {
        const {data} = await instance.get(`api/data/material/${id}/download-link/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchMaterialDownloadLinkAPI;
