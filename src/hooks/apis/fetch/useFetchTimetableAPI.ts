import {useCallback} from "react";
import {EventDetail, LessonDetail, ModificationDetail} from "types";
import dayjs, {Dayjs} from "dayjs";
import {getISODate} from "utils";

import getISODatetime from "utils/getIsoDatetime";

import {useFetchLessonDetailAPI, useFetchLessonListAPI} from "./lesson";
import useFetchModificationListAPI from "./lesson/useFetchModificationListAPI";
import useFetchModificationDetailAPI from "./lesson/useFetchModificationDetailAPI";
import {useFetchEventDetailAPI, useFetchEventListAPI} from "./event";

export interface IFetchTimetableData {
    startDate: string;
    endDate: string;
}

export interface IFetchTimetableResponse {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
}

const defaultFetch = async (fetchListFunc, fetchDataFunc, args): Promise<any> => {
    const listData = await fetchListFunc("", args);

    return Promise.all(
        listData.results.map(element => fetchDataFunc(element.id)),
    );
};

const useFetchTimetableAPI = () => {
    const fetchLessonList = useFetchLessonListAPI();
    const fetchLessonData = useFetchLessonDetailAPI();
    const fetchModificationList = useFetchModificationListAPI();
    const fetchModificationData = useFetchModificationDetailAPI();
    const fetchEventsList = useFetchEventListAPI();
    const fetchEventsData = useFetchEventDetailAPI();

    return useCallback(async (key: string, {
        startDate: stringStartDate,
        endDate: stringEndDate,
    }: IFetchTimetableData): Promise<IFetchTimetableResponse> => {
        const startDate = dayjs(stringStartDate);
        const endDate = dayjs(stringEndDate);

        const fetchLessons = async (): Promise<LessonDetail[]> => defaultFetch(
            fetchLessonList,
            fetchLessonData,
            {
                startDate: getISODate(startDate),
                endDate: getISODate(endDate),
            },
        );
        const fetchModifications = async (): Promise<ModificationDetail[]> => defaultFetch(
            fetchModificationList,
            fetchModificationData,
            {
                startDateMin: getISODatetime(startDate),
                endDateMax: getISODatetime(endDate),
            },
        );
        const fetchEvents = async (): Promise<EventDetail[]> => defaultFetch(
            fetchEventsList,
            fetchEventsData,
            {
                startDateMin: getISODatetime(startDate),
                endDateMax: getISODatetime(endDate),
            },
        );

        const data = await Promise.all([
            fetchLessons(), fetchModifications(), fetchEvents(),
        ]);
        return {
            lessons: data[0],
            modifications: data[1],
            events: data[2],
        };
    }, [fetchEventsData, fetchEventsList, fetchLessonData, fetchLessonList, fetchModificationData, fetchModificationList]);
};

export default useFetchTimetableAPI;
