import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {PaginatedResponse, Session} from "types";

import parseSession from "./parseSession";

export type IFetchSessionsResponse = PaginatedResponse<Session[]>;

const useFetchSessionsAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchSessionsResponse> => {
        const {data} = await instance.get("/api/data/session/", await getLoginConfig());
        await Promise.allSettled(data.results.map(parseSession));

        return data;
    }, [instance]);
};

export default useFetchSessionsAPI;
