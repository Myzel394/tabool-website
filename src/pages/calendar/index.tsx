import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchTimetableAPI, useQueryOptions} from "hooks";
import dayjs from "dayjs";
import {findNextDate} from "utils";
import {useMemoOne} from "use-memo-one";

import Calendar from "./Calendar";

export interface ICalendarManager {

}

const CalendarManager = (props: ICalendarManager) => {
    const startDate = useMemoOne(() => findNextDate(dayjs().subtract(6, "day"), 0), []);
    const endDate = useMemoOne(() => findNextDate(startDate, 4), [startDate]);

    const fetchTimetable = useFetchTimetableAPI();
    const queryOptions = useQueryOptions();
    const {data, isLoading} = useQuery(["fetch_timetable", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    }], fetchTimetable, queryOptions);

    console.log(data);

    return (
        <Calendar />
    );
};

export default memo(CalendarManager);
