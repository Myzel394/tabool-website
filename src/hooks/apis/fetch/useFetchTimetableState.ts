import {useCallback, useEffect, useState} from "react";
import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {Dayjs} from "dayjs";
import {useQuery} from "react-query";
import useQueryOptions from "hooks/useQueryOptions";
import {getISODate, getIsoDatetime} from "utils";
import {QueryResult} from "react-query/types/core/types";

import {useFetchEventDetailAPI, useFetchEventListAPI} from "./event";
import {
    useFetchLessonDetailAPI,
    useFetchLessonListAPI,
    useFetchModificationDetailAPI,
    useFetchModificationListAPI,
} from "./lesson";

export interface IUseFetchTimetableState {
    startDate: Dayjs;
    endDate: Dayjs;
}

const defaultFetch = async (givenData: any, fetchFunc: Function, key: string): Promise<any[]> => {
    return Promise.all(givenData.map(element =>
        fetchFunc(key + element.id, element.id)));
};


const useFetchTimetableState = (
    startDate: Dayjs,
    endDate: Dayjs,
): {
    lessons?: LessonDetail[];
    modifications?: ModificationDetail[];
    events?: EventDetail[];
} => {
    const startDateIso = getISODate(startDate);
    const endDateIso = getISODate(endDate);
    const startDatetimeIso = getIsoDatetime(startDate);
    const endDatetimeIso = getIsoDatetime(endDate);

    const [lessons, setLessons] = useState<LessonDetail[] | undefined>(undefined),
        [modifications, setModifications] = useState<ModificationDetail[] | undefined>(undefined),
        [events, setEvents] = useState<EventDetail[] | undefined>(undefined);

    const fetchLessonList = useFetchLessonListAPI(),
        fetchLessonDetail = useFetchLessonDetailAPI(),
        fetchModificationList = useFetchModificationListAPI(),
        fetchModificationDetail = useFetchModificationDetailAPI(),
        fetchEventList = useFetchEventListAPI(),
        fetchEventDetail = useFetchEventDetailAPI();

    const queryOptions = useQueryOptions();

    const lessonQuery = useQuery(["", {
            dateMin: startDateIso,
            dateMax: endDateIso,
        }], fetchLessonList, queryOptions),
        modificationsQuery = useQuery(["", {
            startDateMin: startDatetimeIso,
            endDateMax: endDatetimeIso,
        }], fetchModificationList, queryOptions),
        eventsQuery = useQuery(["", {
            startDateMin: startDatetimeIso,
            endDateMax: endDatetimeIso,
        }], fetchEventList, queryOptions);

    const handleResponse = useCallback(async (
        query: QueryResult<any, any>,
        fetchDetailFn: Function,
        setFn: Function,
        key: string,
    ) => {
        if (!query.isFetching && query.isSuccess && query.data?.results?.length > 0) {
            const givenData = await defaultFetch(query.data?.results, fetchDetailFn, key);

            setFn(givenData);
        }
    }, []);

    // Fetch lessons
    useEffect(() => {
        handleResponse(
            lessonQuery, fetchLessonDetail, setLessons, "lesson_",
        );
    }, [lessonQuery.isFetching, lessonQuery.data, fetchLessonDetail, lessonQuery.isSuccess, handleResponse, lessonQuery]);

    // Fetch modifications
    useEffect(() => {
        handleResponse(
            modificationsQuery, useFetchModificationDetailAPI, setModifications, "modification_",
        );
    }, [fetchModificationDetail, handleResponse, modificationsQuery, modificationsQuery.data, modificationsQuery.isFetching, modificationsQuery.isSuccess]);

    // Fetch events
    useEffect(() => {
        handleResponse(
            eventsQuery, fetchEventDetail, setEvents, "event_",
        );
    }, [eventsQuery, eventsQuery.data, eventsQuery.isFetching, eventsQuery.isSuccess, fetchEventDetail, fetchEventList, handleResponse]);

    return {
        lessons,
        modifications,
        events,
    };
};

export default useFetchTimetableState;
