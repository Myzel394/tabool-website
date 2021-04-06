import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";
import {TeacherDailyDataView} from "types";

import parseTeacherDailyData from "./parseTeacherDailyData";

export interface IFetchTeacherDailyDataData {
    date?: Dayjs;
    maxFutureDays?: number;
}

const useFetchTeacherDailyDataAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        date,
        maxFutureDays,
    }: IFetchTeacherDailyDataData): Promise<TeacherDailyDataView> => {
        const {data} = await instance.get(buildUrl("/daily-data/"), {
            params: {
                maxFutureDays,
                date: date ? lazyDatetime(date, "date") : undefined,
            },
            ...await getLoginConfig(),
        });

        await parseTeacherDailyData(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherDailyDataAPI;
