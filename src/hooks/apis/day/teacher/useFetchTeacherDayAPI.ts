import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";
import {TeacherDayView} from "types";

import parseTeacherDay from "./parseTeacherDay";

export interface IFetchTeacherDayData {
    startDate?: Dayjs;
    endDate?: Dayjs;
}

const useFetchTeacherDayAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        endDate,
        startDate,
    }: IFetchTeacherDayData): Promise<TeacherDayView> => {
        const {data} = await instance.get(buildUrl("/lesson/"), {
            params: {
                startDate: startDate === undefined ? undefined : lazyDatetime(startDate, "date"),
                endDate: endDate === undefined ? undefined : lazyDatetime(endDate, "date"),
            },
            ...await getLoginConfig(),
        });

        await parseTeacherDay(data);

        return data;
    }, [instance, buildUrl]);
};

export default useFetchTeacherDayAPI;
