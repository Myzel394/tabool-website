import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {ServerPreference} from "types";

import parsePreference from "./parsePreference";

export interface IUpdatePreferenceData {
    data: Record<any, any>;
}

const useUpdatePreferenceAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async (id: string, {
        data: jsonData,
    }: IUpdatePreferenceData): Promise<ServerPreference> => {
        const {data} = await instance.patch(buildUrl(`/preference/${id}/`), {
            data: JSON.stringify(jsonData),
        }, await getLoginConfig());
        await parsePreference(data);

        return data;
    }, [instance, buildUrl]);
};

export default useUpdatePreferenceAPI;
