import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {ServerPreference} from "types";

import parsePreference from "./parsePreference";

const useFetchPreferenceAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (preferenceId: string): Promise<ServerPreference> => {
        const {data} = await instance.get(`/api/data/preference/${preferenceId}/`, await getLoginConfig());
        await parsePreference(data);

        return data;
    }, [instance]);
};

export default useFetchPreferenceAPI;
