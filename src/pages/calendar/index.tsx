import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchTimetableAPI, useQueryOptions} from "hooks";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate} from "utils";
import {useMemoOne} from "use-memo-one";

import Calendar from "./Calendar";
import {LoadingIndicator} from "components/indicators";
import {IFetchTimetableResponse} from "../../hooks/apis/fetch/useFetchTimetableAPI";

export interface ICalendarManager {

}

const CalendarManager = (props: ICalendarManager) => {
    const startDate = useMemoOne<Dayjs>(() =>
        findNextDate(dayjs().subtract(6, "day"), 0),
        []);
    const endDate = useMemoOne<Dayjs>(() =>
        findNextDate(startDate, 4),
        [startDate]
    );

    const fetchTimetable = useFetchTimetableAPI();
    const queryOptions = useQueryOptions();
    const {data, isLoading} = useQuery(["fetch_timetable", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    }], fetchTimetable, queryOptions);

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <Calendar
                    date={startDate}
                    events={data.events}
                    lessons={data.lessons}
                    modifications={data.modifications}
                />
            }
        </LoadingIndicator>
    );
};

export default memo(CalendarManager);
