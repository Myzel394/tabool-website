/* eslint-disable id-length */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {AutocompleteResponse} from "types";

export interface IFetchAbsenceReasonAutocompletionData {
    query?: string;
}

export type IFetchAbsenceReasonAutocompletionResponse = AutocompleteResponse;

const useFetchHomeworkTypeAutocompletionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        query,
    }: IFetchAbsenceReasonAutocompletionData): Promise<IFetchAbsenceReasonAutocompletionResponse> => {
        const {data} = await instance.get("/api/autocomplete/absence/reason/", {
            ...await getLoginConfig(),
            params: {
                q: query,
            },
        });

        return data;
    }, [instance]);
};

export default useFetchHomeworkTypeAutocompletionAPI;
