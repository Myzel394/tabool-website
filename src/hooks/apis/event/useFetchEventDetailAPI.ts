import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import {getLoginConfig} from "api";

import parseEventDetail from "./parseEventDetail";

const useFetchEventDetailAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<EventDetail> => {
        const {data} = await instance.get(buildUrl(`/event/${id}/`), await getLoginConfig());

        await parseEventDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchEventDetailAPI;
