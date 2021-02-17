import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";
import {StudentWeekView} from "types";

import parseStudentWeek from "./parseStudentWeek";

export interface IFetchStudentDayData {
    startDate?: Dayjs;
    endDate?: Dayjs;
}

const useFetchStudentWeekAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        endDate,
        startDate,
    }: IFetchStudentDayData): Promise<StudentWeekView> => {
        const {data} = await instance.get(buildUrl("/week/"), {
            params: {
                startDate: startDate === undefined ? undefined : lazyDatetime(startDate, "date"),
                endDate: endDate === undefined ? undefined : lazyDatetime(endDate, "date"),
            },
            ...await getLoginConfig(),
        });

        await parseStudentWeek(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentWeekAPI;
