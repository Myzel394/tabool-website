import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Dayjs} from "dayjs";
import {lazyDatetime} from "utils";
import {StudentDayView} from "types";

import parseStudentDay from "./parseStudentDay";

export interface IFetchStudentDayData {
    startDate?: Dayjs;
    endDate?: Dayjs;
}

const useFetchStudentDayAPI = () => {
    const {instance, buildUrl} = useContext(AxiosContext);

    return useCallback(async ({
        endDate,
        startDate,
    }: IFetchStudentDayData): Promise<StudentDayView> => {
        const {data} = await instance.get(buildUrl("/lesson/"), {
            params: {
                startDate: startDate === undefined ? undefined : lazyDatetime(startDate, "date"),
                endDate: endDate === undefined ? undefined : lazyDatetime(endDate, "date"),
            },
            ...await getLoginConfig(),
        });

        await parseStudentDay(data);
        
        return data;
    }, [instance, buildUrl]);
};

export default useFetchStudentDayAPI;
