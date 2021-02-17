import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";
import {TeacherWeekView} from "types";

import parseTeacherWeek from "./parseTeacherWeek";

export interface IFetchTeacherDayData {
    startDate?: Dayjs;
    endDate?: Dayjs;
}

const useFetchTeacherWeekAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        endDate,
        startDate,
    }: IFetchTeacherDayData): Promise<TeacherWeekView> => {
        const {data} = await instance.get(buildUrl("/week/"), {
            params: {
                startDate: startDate === undefined ? undefined : lazyDatetime(startDate, "date"),
                endDate: endDate === undefined ? undefined : lazyDatetime(endDate, "date"),
            },
            ...await getLoginConfig(),
        });

        await parseTeacherWeek(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherWeekAPI;
