/* eslint-disable id-length */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {AutocompleteResponse} from "types";
import {getLoginConfig} from "api";

const useFetchHomeworkAutocompletionsAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        query,
    }): Promise<AutocompleteResponse> => {
        const {data} = await instance.get("/api/autocomplete/homework/type/", {
            ...await getLoginConfig(),
            params: {
                q: query,
            },
        });

        return data;
    }, [instance]);
};

export default useFetchHomeworkAutocompletionsAPI;
