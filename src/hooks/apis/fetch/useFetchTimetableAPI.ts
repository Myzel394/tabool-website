/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail, FetchListData, HomeworkDetail, LessonDetail, MaterialList, ModificationDetail} from "types";
import {convertToDate, getLoginConfig} from "api";
import {Dayjs} from "dayjs";

import {parseLesson} from "./lesson";
import {parseEvent} from "./event";

export interface IFetchTimetableData extends FetchListData {
    startDatetime: string;
    endDatetime: string;
}

export interface IFetchTimetableResponse {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    homeworks: HomeworkDetail[];
    materials: MaterialList[];
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}

const useFetchTimetableAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, {
        endDatetime,
        startDatetime,
        page,
    }: IFetchTimetableData): Promise<IFetchTimetableResponse> => {
        const {data} = await instance.get("/api/data/timetable/", {
            params: {
                start_datetime: startDatetime,
                end_datetime: endDatetime,
                page,
            },
            ...await getLoginConfig(),
        });
        data.lessons.forEach(lesson => parseLesson(lesson));
        data.events.forEach(event => parseEvent(event));
        convertToDate(data, ["earliestDateAvailable", "latestDateAvailable"]);

        return data;
    }, [instance]);
};

export default useFetchTimetableAPI;
