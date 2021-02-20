import {useMemo} from "react";
import {UseQueryOptions} from "react-query/types/react/types";

import useSaveData from "./useSaveData";

type ConfigType = UseQueryOptions<any, any, any>;

const NO_RETRY_CODES = [
    404,
    503,
    403,
    401,
];

const useQueryOptions = (): ConfigType => {
    const saveData = useSaveData();
    const options = useMemo<ConfigType>(() => {
        let defaultData: ConfigType = {
            retry: (failureCount, error) => !NO_RETRY_CODES.includes(error.response?.status),
        };

        if (saveData) {
            defaultData = {
                ...defaultData,
                refetchOnWindowFocus: false,
                refetchOnMount: true,
                refetchOnReconnect: false,
            };
        }

        return defaultData;
    }, [saveData]);

    return options;
};

export default useQueryOptions;
