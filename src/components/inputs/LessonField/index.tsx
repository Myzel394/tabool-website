import React, {forwardRef, useContext, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useQuery} from "react-query";
import {useDetailPageError, useQueryOptions} from "hooks";
import {IFetchTimetableData, IFetchTimetableResponse, useFetchTimetableAPI} from "hooks/apis";
import {combineDatetime, findNextDate, getIsoDatetime, setBeginTime, setEndTime} from "utils";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {ErrorContext} from "contexts";
import {Event as CalendarEvent} from "react-big-calendar";

import {LoadingIndicator} from "../../indicators";

import Timetable from "./Timetable";

export interface ILessonField {
    value: string;
    onChange: (id: string) => any;

    initialDate?: Dayjs;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    minTime?: Dayjs;
    maxTime?: Dayjs;
    allowedCourses?: string[];
}

const getStartDate = (targetedDate: Dayjs): Dayjs =>
    setBeginTime(
        findNextDate(
            targetedDate.subtract(4, "day"),
            1,
        ),
    );

const getEndDate = (targetedDate: Dayjs): Dayjs =>
    setEndTime(
        findNextDate(
            targetedDate,
            5,
        ),
    );

const LessonField = ({
    allowedCourses,
    initialDate,
    maxDate,
    maxTime,
    minDate,
    minTime,
    onChange,
    value,
}: ILessonField, ref) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchTimetable = useFetchTimetableAPI();
    const {onFetchError} = useDetailPageError();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const [activeDate, setActiveDate] = useState<Dayjs>(initialDate ?? dayjs());

    const startDate = getStartDate(activeDate);
    const endDate = getEndDate(startDate);
    const timetableData = {
        startDatetime: getIsoDatetime(startDate),
        endDatetime: getIsoDatetime(endDate),
    };

    const {
        data: timetable,
        isLoading,
    } = useQuery<IFetchTimetableResponse, AxiosError, IFetchTimetableData>(
        ["fetch_timetable", timetableData],
        () => fetchTimetable(timetableData),
        {
            ...queryOptions,
            onError: error => onFetchError(error, Boolean(timetable)),
        },
    );

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!timetable) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    const timetableMinDate = (() => {
        if (!minDate) {
            return timetable.earliestDateAvailable;
        }

        return dayjs.unix(
            Math.max(
                minDate.unix(),
                timetable.earliestDateAvailable.unix(),
            ),
        );
    })();
    const timetableMaxDate = (() => {
        if (!maxDate) {
            return timetable.latestDateAvailable;
        }

        return dayjs.unix(
            Math.min(
                maxDate.unix(),
                timetable.latestDateAvailable.unix(),
            ),
        );
    })();
    const lessons: CalendarEvent[] = timetable.lessons.map(lesson => ({
        allDay: false,
        title: lesson.lessonData.course.name,
        start: combineDatetime(lesson.date, lesson.lessonData.startTime).toDate(),
        end: combineDatetime(lesson.date, lesson.lessonData.endTime).toDate(),
        resource: {
            ...lesson,
            type: "lesson",
        },
    }));

    return (
        <Timetable
            lessons={lessons}
            activeDate={activeDate}
            minDate={timetableMinDate}
            maxDate={timetableMaxDate}
            selectedLesson={value}
            onDateChange={setActiveDate}
            onLessonSelect={onChange}
        />
    );
};

export default forwardRef(LessonField);
