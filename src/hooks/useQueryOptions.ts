import {useMemo} from "react";
import {QueryConfig} from "react-query";

import useSaveData from "./useSaveData";


type ConfigType = QueryConfig<any, any>;

const useQueryOptions = (): ConfigType => {
    const saveData = useSaveData();
    const options = useMemo<ConfigType>(() => {
        if (saveData) {
            return {
                refetchOnWindowFocus: false,
                refetchOnMount: true,
                retry: 1,
                refetchOnReconnect: false,
            };
        }
        return {};
    }, [saveData]);

    return options;
};

export default useQueryOptions;
