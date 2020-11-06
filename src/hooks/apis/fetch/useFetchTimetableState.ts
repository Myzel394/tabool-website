import {useEffect, useState} from "react";
import {EventDetail, LessonDetail, ModificationDetail} from "types";
import {Dayjs} from "dayjs";
import {useQuery} from "react-query";
import useQueryOptions from "hooks/useQueryOptions";
import {getISODate, getIsoDatetime} from "utils";

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

const defaultFetch = async (givenData: any, fetchFunc: Function): Promise<any[]> => {
    return Promise.all(givenData.map(element =>
        fetchFunc(element.id)));
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

    // Fetch lessons
    useEffect(() => {
        const handle = async () => {
            if (!lessonQuery.isFetching && lessonQuery.isSuccess && lessonQuery.data?.results?.length > 0) {
                const lessons: LessonDetail[] = await defaultFetch(lessonQuery.data.results, fetchLessonDetail);

                setLessons(lessons);
            }
        };

        handle();
    }, [lessonQuery.isFetching, lessonQuery.data, fetchLessonDetail, lessonQuery.isSuccess]);

    // Fetch modifications
    useEffect(() => {
        const handle = async () => {
            if (!modificationsQuery.isFetching && modificationsQuery.isSuccess && modificationsQuery.data?.results?.length > 0) {
                const modifications = await defaultFetch(modificationsQuery.data.results, fetchModificationDetail);

                setModifications(modifications);
            }
        };

        handle();
    }, [fetchModificationDetail, modificationsQuery.data, modificationsQuery.isFetching, modificationsQuery.isSuccess]);

    // Fetch events
    useEffect(() => {
        const handle = async () => {
            if (!eventsQuery.isFetching && eventsQuery.isSuccess && eventsQuery.data?.results?.length > 0) {
                const events = await defaultFetch(eventsQuery.data.results, fetchEventDetail);

                setEvents(events);
            }
        };

        handle();
    }, [eventsQuery.data, eventsQuery.isFetching, eventsQuery.isSuccess, fetchEventDetail, fetchEventList]);

    return {
        lessons,
        modifications,
        events,
    };
};

export default useFetchTimetableState;
