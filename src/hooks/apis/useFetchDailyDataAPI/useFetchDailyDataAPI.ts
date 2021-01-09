import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {DailyData} from "types";

import parseFetchDailyData from "./parseFetchDailyData";

export interface IFetchDailyDataData {
    date?: Dayjs;
    maxFutureDays?: number;
}

export type IFetchDailyDataResponse = DailyData;

const useFetchDailyDataAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        date,
        maxFutureDays,
    }: IFetchDailyDataData): Promise<IFetchDailyDataResponse> => {
        const {data} = await instance.get("/api/", {
            params: {
                date,
                maxFutureDays,
            },
            ...await getLoginConfig(),
        });
        await parseFetchDailyData(data);

        return data;
    }, [instance]);
};

export default useFetchDailyDataAPI;
