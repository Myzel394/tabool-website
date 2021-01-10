import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import {getLoginConfig} from "api";

import parseEvent from "./parseEvent";


const useFetchEventDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<EventDetail> => {
        const {data} = await instance.get(`/api/data/event/${id}/`, await getLoginConfig());
        await parseEvent(data);

        return data;
    }, [instance]);
};

export default useFetchEventDetailAPI;
