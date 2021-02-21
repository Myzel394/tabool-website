import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IFetchPageTitleData {
    url: string;
}

export interface IFetchPageTitleResponse {
    title: string;
}

const useFetchPageTitleAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        url,
    }: IFetchPageTitleData): Promise<IFetchPageTitleResponse> => {
        const {data} = await instance.get("api/data/get-page-title/", {
            params: {
                url,
            },
            ...await getLoginConfig(),
        });

        return data;
    }, [instance]);
};

export default useFetchPageTitleAPI;
