import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Preference} from "types";

import useUser from "../../useUser";

import parsePreference from "./parsePreference";

export interface IUpdatePreferenceData {
    data: Record<any, any>;
}

const useUpdatePreferenceAPI = () => {
    const user = useUser();
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        data: jsonData,
    }: IUpdatePreferenceData): Promise<Preference> => {
        if (!user.data?.id) {
            throw new Error("User has no id.");
        }

        const {data} = await instance.patch(buildUrl(`/preference/${user.data.id}/`), {
            data: JSON.stringify(jsonData),
        }, await getLoginConfig());
        await parsePreference(data);

        return data;
    }, [instance, buildUrl, user.data?.id]);
};

export default useUpdatePreferenceAPI;
