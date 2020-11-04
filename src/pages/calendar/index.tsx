import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchLessonListAPI, useQueryOptions} from "hooks";
import dayjs from "dayjs";
import {findNextDate, getISODate} from "utils";

import Calendar from "./Calendar";

export interface ICalendarManager {

}

const CalendarManager = (props: ICalendarManager) => {
    const startDate = findNextDate(dayjs().subtract(6, "day"), 0);
    const endDate = findNextDate(startDate, 4);

    const fetchTimetable = useFetchLessonListAPI();
    const queryOptions = useQueryOptions();
    const {data, isLoading} = useQuery(["fetch_timetable", {
        startDate: getISODate(startDate),
        endDate: getISODate(endDate),
    }], fetchTimetable, queryOptions);

    console.log(data);

    return (
        <Calendar />
    );
};

export default memo(CalendarManager);
