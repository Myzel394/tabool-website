/* eslint-disable @typescript-eslint/naming-convention */
import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail, FetchListData, HomeworkApprox, LessonDetail, MaterialApprox, ModificationDetail} from "types";
import {convertToDate, getLoginConfig} from "api";
import {Dayjs} from "dayjs";

import {parseLesson, parseModification} from "./lesson";
import {parseEvent} from "./event";
import {parseHomework, parseMaterial} from "./homework";

export interface IFetchTimetableData extends FetchListData {
    startDatetime: string;
    endDatetime: string;
}

export interface IFetchTimetableResponse {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    homeworks: HomeworkApprox[];
    materials: MaterialApprox[];
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
        data.modifications.forEach(modification => parseModification(modification));
        data.events.forEach(event => parseEvent(event));
        data.homeworks.forEach(homework => parseHomework(homework));
        data.materials.forEach(material => parseMaterial(material));
        convertToDate(data, ["earliestDateAvailable", "latestDateAvailable"]);

        return data;
    }, [instance]);
};

export default useFetchTimetableAPI;
