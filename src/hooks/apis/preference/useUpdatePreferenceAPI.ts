import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Preferences} from "types";

import parsePreference from "./parsePreference";

export interface IUpdatePreferenceData {
    data: Record<any, any>;
}

const useUpdatePreferenceAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (preferenceId: string, {
        data: jsonData,
    }: IUpdatePreferenceData): Promise<Preferences> => {
        const {data} = await instance.patch(`/api/data/preference/${preferenceId}/`, {
            data: JSON.stringify(jsonData),
        }, await getLoginConfig());
        await parsePreference(data);

        return data;
    }, [instance]);
};

export default useUpdatePreferenceAPI;
