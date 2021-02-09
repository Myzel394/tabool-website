import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {PaginatedResponse, Poll} from "types";

import parsePoll from "./parsePoll";

export type IFetchPollsResponse = PaginatedResponse<Poll[]>;

const useFetchPollsAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchPollsResponse> => {
        const {data} = await instance.get("/api/data/poll/", await getLoginConfig());
        await Promise.allSettled(data.results.map(parsePoll));

        return data;
    }, [instance]);
};

export default useFetchPollsAPI;
