/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {FetchListData, Timetable} from "types";
import {getLoginConfig} from "api";

import parseTimetable from "./parseTimetable";

export interface IFetchTimetableData extends FetchListData {
    startDatetime: string;
    endDatetime: string;
}

export type IFetchTimetableResponse = Timetable;

const useFetchTimetableAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        endDatetime,
        startDatetime,
    }: IFetchTimetableData, page = 1): Promise<IFetchTimetableResponse> => {
        const {data} = await instance.get("/api/data/timetable/", {
            params: {
                start_datetime: startDatetime,
                end_datetime: endDatetime,
                page,
            },
            ...await getLoginConfig(),
        });

        await parseTimetable(data);

        return data;
    }, [instance]);
};

export default useFetchTimetableAPI;
