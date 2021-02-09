import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import getLoginConfig from "api/getLoginConfig";

import parseEventDetail from "./parseEventDetail";

const useDeleteEventAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<EventDetail> => {
        const {data} = await instance.delete(buildUrl(`/event/${id}/`), await getLoginConfig());

        await parseEventDetail(data);

        return data;
    }, [instance, buildUrl]);
};

export default useDeleteEventAPI;
