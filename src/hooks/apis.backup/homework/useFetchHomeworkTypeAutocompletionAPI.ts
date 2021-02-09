/* eslint-disable id-length */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {AutocompleteResponse} from "types";

export interface IFetchHomeworkTypeAutocompletionData {
    query?: string;
}

export type IFetchHomeworkTypeAutocompletionResponse = AutocompleteResponse;

const useFetchHomeworkTypeAutocompletionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        query,
    }: IFetchHomeworkTypeAutocompletionData): Promise<IFetchHomeworkTypeAutocompletionResponse> => {
        const {data} = await instance.get("/api/autocomplete/homework/type/", {
            ...await getLoginConfig(),
            params: {
                q: query,
            },
        });

        return data;
    }, [instance]);
};

export default useFetchHomeworkTypeAutocompletionAPI;
