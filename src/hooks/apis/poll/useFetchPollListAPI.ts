import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {PaginatedResponse, Poll} from "types";
import getLoginConfig from "api/getLoginConfig";

import parsePoll from "./parsePoll";

export type IFetchPollResponse = PaginatedResponse<Poll[]>;


const useFetchPollListAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    // eslint-disable-next-line no-empty-pattern
    return useCallback(async ({}, page = 1): Promise<IFetchPollResponse> => {
        const {data} = await instance.get(buildUrl("/poll/"), {
            params: {
                page,
            },
            ...await getLoginConfig(),
        });

        await Promise.allSettled(data.results.map(parsePoll));

        return data;
    }, [instance, buildUrl]);
};

export default useFetchPollListAPI;
