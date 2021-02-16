import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {ServerPreference} from "types";

import useUser from "../../useUser";

import parsePreference from "./parsePreference";

const useFetchPreferenceAPI = () => {
    const user = useUser();
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<ServerPreference> => {
        if (!user.data?.id) {
            throw new Error("User has no id.");
        }

        const {data} = await instance.get(buildUrl(`/preference/${id}/`), await getLoginConfig());
        await parsePreference(data);

        return data;
    }, [instance, buildUrl, user.data?.id]);
};

export default useFetchPreferenceAPI;
