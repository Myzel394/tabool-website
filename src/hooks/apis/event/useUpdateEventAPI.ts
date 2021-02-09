import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseEventDetail from "./parseEventDetail";

export interface IUpdateEventData {
    presenceContent: string | null;
    onlineContent: string | null;
}

const useUpdateEventAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        onlineContent,
        presenceContent,
    }: IUpdateEventData): Promise<EventDetail> => {
        const {data} = await instance.patch(buildUrl(`/event/${id}/`), {
            onlineContent,
            presenceContent,
        }, await getLoginConfig());

        await parseEventDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdateEventAPI;
