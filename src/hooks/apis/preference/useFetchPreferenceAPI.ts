import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Preference} from "types";

import parsePreference from "./parsePreference";

const useFetchPreferenceAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<Preference> => {
        const {data} = await instance.get(buildUrl(`/preference/${id}/`), await getLoginConfig());
        await parsePreference(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchPreferenceAPI;
