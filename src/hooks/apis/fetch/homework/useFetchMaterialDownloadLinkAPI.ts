import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IFetchMaterialDownloadLinkData {
    id: string;
}

export interface IFetchMaterialDownloadLinkResponse {
    file?: string;
}

const useFetchMaterialDownloadLinkAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        id,
    }: IFetchMaterialDownloadLinkData): Promise<IFetchMaterialDownloadLinkResponse> => {
        const {data} = await instance.get(`api/data/material/${id}/download-link/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchMaterialDownloadLinkAPI;
