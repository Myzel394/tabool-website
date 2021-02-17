import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";
import {StudentDailyDataView} from "types";

import parseStudentDailyData from "./parseStudentDailyData";

export interface IFetchStudentDailyDataData {
    date?: Dayjs;
    maxFutureDays?: number;
}

const useFetchStudentDailyDataAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        date,
        maxFutureDays,
    }: IFetchStudentDailyDataData): Promise<StudentDailyDataView> => {
        const {data} = await instance.get(buildUrl("/daily-data/"), {
            params: {
                maxFutureDays,
                date: date ? lazyDatetime(date, "date") : undefined,
            },
            ...await getLoginConfig(),
        });

        await parseStudentDailyData(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentDailyDataAPI;
