import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";

export interface IFetchPageTitleLocallyData {
    url: string;
}

export interface IFetchPageTitleLocallyResponse {
    title: string;
}

const regex = new RegExp("<title>(.*?)</title>", "i");

/**
 * Fetches the title of an page by fetching it on own
 */
const useFetchPageTitleLocally = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        url,
    }: IFetchPageTitleLocallyData): Promise<IFetchPageTitleLocallyResponse> => {
        const {data} = await instance.get(url);
        const title = data?.match?.(regex)?.[1];

        if (title === undefined) {
            throw new Error("Title not found.");
        }

        return data;
    }, [instance]);
};

export default useFetchPageTitleLocally;
