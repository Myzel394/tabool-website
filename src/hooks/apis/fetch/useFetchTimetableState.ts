import {useEffect, useState} from "react";
import {EventDetail, HomeworkDetail, LessonDetail, ModificationDetail} from "types";
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
import {useFetchHomeworkDetailAPI, useFetchHomeworkListAPI} from "./homework";

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
    homeworks?: HomeworkDetail[];
} => {
    const startDateIso = getISODate(startDate);
    const endDateIso = getISODate(endDate);
    const startDatetimeIso = getIsoDatetime(startDate);
    const endDatetimeIso = getIsoDatetime(endDate);

    const [lessons, setLessons] = useState<LessonDetail[] | undefined>(undefined),
        [modifications, setModifications] = useState<ModificationDetail[] | undefined>(undefined),
        [events, setEvents] = useState<EventDetail[] | undefined>(undefined),
        [homeworks, setHomeworks] = useState<HomeworkDetail[] | undefined>(undefined);

    const fetchLessonList = useFetchLessonListAPI(),
        fetchLessonDetail = useFetchLessonDetailAPI(),
        fetchModificationList = useFetchModificationListAPI(),
        fetchModificationDetail = useFetchModificationDetailAPI(),
        fetchEventList = useFetchEventListAPI(),
        fetchEventDetail = useFetchEventDetailAPI(),
        fetchHomeworkList = useFetchHomeworkListAPI(),
        fetchHomeworkDetail = useFetchHomeworkDetailAPI();

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
        }], fetchEventList, queryOptions),
        homeworkQuery = useQuery(["", {
            dueDateMin: startDateIso,
            dueDateMax: endDateIso,
        }], fetchHomeworkList, queryOptions);

    // Fetch lessons
    useEffect(() => {
        const handle = async () => {
            if (!lessonQuery.isFetching && lessonQuery.isSuccess && lessonQuery.data?.results?.length > 0) {
                const givenLessons: LessonDetail[] = await defaultFetch(lessonQuery.data.results, fetchLessonDetail);

                setLessons(givenLessons);
            }
        };

        handle();
    }, [lessonQuery.isFetching, lessonQuery.data, fetchLessonDetail, lessonQuery.isSuccess]);

    // Fetch modifications
    useEffect(() => {
        const handle = async () => {
            if (!modificationsQuery.isFetching && modificationsQuery.isSuccess && modificationsQuery.data?.results?.length > 0) {
                const givenModifications = await defaultFetch(modificationsQuery.data.results, fetchModificationDetail);

                setModifications(givenModifications);
            }
        };

        handle();
    }, [fetchModificationDetail, modificationsQuery.data, modificationsQuery.isFetching, modificationsQuery.isSuccess]);

    // Fetch events
    useEffect(() => {
        const handle = async () => {
            if (!eventsQuery.isFetching && eventsQuery.isSuccess && eventsQuery.data?.results?.length > 0) {
                const givenEvents = await defaultFetch(eventsQuery.data.results, fetchEventDetail);

                setEvents(givenEvents);
            }
        };

        handle();
    }, [eventsQuery.data, eventsQuery.isFetching, eventsQuery.isSuccess, fetchEventDetail, fetchEventList]);

    // Fetch homeworks
    useEffect(() => {
        const handle = async () => {
            if (!homeworkQuery.isFetching && homeworkQuery.isSuccess && homeworkQuery.data?.results?.length > 0) {
                const givenHomeworks = await defaultFetch(homeworkQuery.data.results, fetchHomeworkDetail);

                setHomeworks(givenHomeworks);
            }
        };

        handle();
    });

    return {
        lessons,
        modifications,
        events,
        homeworks,
    };
};

export default useFetchTimetableState;
