import {useMemo} from "react";
import {UseQueryOptions} from "react-query/types/react/types";

import useSaveData from "./useSaveData";

type ConfigType = UseQueryOptions<any, any, any>;

const useQueryOptions = (): ConfigType => {
    const saveData = useSaveData();
    const options = useMemo<ConfigType>(() => {
        return saveData
            ? {
                refetchOnWindowFocus: false,
                refetchOnMount: true,
                retry: 1,
                refetchOnReconnect: false,
            }
            : {};
    }, [saveData]);

    return options;
};

export default useQueryOptions;
