import {useSaveData} from "react-adaptive-hooks/save-data";
import {useMemo} from "react";
import {QueryConfig} from "react-query";


type ConfigType = QueryConfig<any, any>;

const useQueryOptions = (): ConfigType => {
    const {saveData} = useSaveData();
    const options = useMemo<ConfigType>(() => {
        if (saveData) {
            return {
                refetchOnWindowFocus: false,
                retry: 2,
                refetchOnReconnect: false,
            };
        }
        return {};
    }, [saveData]);

    return options;
};

export default useQueryOptions;
