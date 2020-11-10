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
    const data = await Promise.all(givenData.map(element =>
        fetchFunc(key + element.id, element.id)));
    return data;
};


const useFetchTimetableState = (
    startDate: Dayjs,
    endDate: Dayjs,
    resetDataOnChange = true,
): {
    lessons?: LessonDetail[];
    modifications?: ModificationDetail[];
    events?: EventDetail[];
    lessonsFetching: boolean;
    modificationsFetching: boolean;
    eventsFetching: boolean;
} => {
    const startDateIso = getISODate(startDate);
    const endDateIso = getISODate(endDate);
    const startDatetimeIso = getIsoDatetime(startDate);
    const endDatetimeIso = getIsoDatetime(endDate);

    const [lessons, setLessons] = useState<LessonDetail[] | undefined>(undefined),
        [modifications, setModifications] = useState<ModificationDetail[] | undefined>(undefined),
        [events, setEvents] = useState<EventDetail[] | undefined>(undefined);
    const [lessonsDetailFetching, setLessonsDetailFetching] = useState<boolean>(true),
        [modificationsDetailFetching, setModificationsDetailFetching] = useState<boolean>(true),
        [eventsDetailFetching, setEventsDetailFetching] = useState<boolean>(true);

    const fetchLessonList = useFetchLessonListAPI(),
        fetchLessonDetail = useFetchLessonDetailAPI(),
        fetchModificationList = useFetchModificationListAPI(),
        fetchModificationDetail = useFetchModificationDetailAPI(),
        fetchEventList = useFetchEventListAPI(),
        fetchEventDetail = useFetchEventDetailAPI();

    const queryOptions = useQueryOptions();

    const lessonQuery = useQuery(["lesson", {
            dateMin: startDateIso,
            dateMax: endDateIso,
        }], fetchLessonList, queryOptions),
        modificationsQuery = useQuery(["modification", {
            startDateMin: startDatetimeIso,
            endDateMax: endDatetimeIso,
        }], fetchModificationList, queryOptions),
        eventsQuery = useQuery(["event", {
            startDateMin: startDatetimeIso,
            endDateMax: endDatetimeIso,
        }], fetchEventList, queryOptions);

    const handleResponse = useCallback((
        query: QueryResult<any, any>,
        fetchDetailFn: Function,
        setFn: Function,
        key: string,
        statusFn: (value: boolean) => any,
    ) => {
        statusFn(true);
        if (query.data?.results?.length === 0) {
            setFn([]);
            statusFn(false);
        } else if (!query.isFetching && query.isSuccess) {
            statusFn(true);
            defaultFetch(query.data.results, fetchDetailFn, key)
                .then(givenData => setFn(givenData))
                .finally(() => statusFn(false))
                .catch(() => null);
        }
    }, []);

    // Fetch lessons
    useEffect(() => {
        handleResponse(
            lessonQuery, fetchLessonDetail, setLessons, "lesson_", setLessonsDetailFetching,
        );
    }, [lessonQuery.isFetching, lessonQuery.data, fetchLessonDetail, lessonQuery.isSuccess, handleResponse, lessonQuery]);

    // Fetch modifications
    useEffect(() => {
        handleResponse(
            modificationsQuery, fetchModificationDetail, setModifications, "modification_", setModificationsDetailFetching,
        );
    }, [fetchModificationDetail, handleResponse, modificationsQuery, modificationsQuery.data, modificationsQuery.isFetching, modificationsQuery.isSuccess]);

    // Fetch events
    useEffect(() => {
        handleResponse(
            eventsQuery, fetchEventDetail, setEvents, "event_", setEventsDetailFetching,
        );
    }, [eventsQuery, eventsQuery.data, eventsQuery.isFetching, eventsQuery.isSuccess, fetchEventDetail, fetchEventList, handleResponse]);

    // Reset data
    useEffect(() => {
        if (resetDataOnChange) {
            setLessons(undefined);
            setModifications(undefined);
            setEvents(undefined);
        }
    }, [resetDataOnChange, startDate, endDate]);

    return {
        lessons,
        modifications,
        events,
        lessonsFetching: lessonsDetailFetching || lessonQuery.isFetching,
        modificationsFetching: modificationsDetailFetching || modificationsQuery.isFetching,
        eventsFetching: eventsDetailFetching || eventsQuery.isFetching,
    };
};

export default useFetchTimetableState;
