import React, {memo} from "react";
import dayjs, {Dayjs} from "dayjs";
import {findNextDate} from "utils";
import {useMemoOne} from "use-memo-one";
import {LoadingIndicator} from "components/indicators";
import useFetchTimetableState from "hooks/apis/fetch/useFetchTimetableState";

import Calendar from "./Calendar";

export interface ICalendarManager {

}

const CalendarManager = ({}: ICalendarManager) => {
    const startDate = useMemoOne<Dayjs>(() =>
        findNextDate(dayjs().subtract(4, "day"), 1),
    []);
    const endDate = useMemoOne<Dayjs>(() =>
        findNextDate(startDate, 5),
    [startDate]);

    const {lessons, modifications, events} = useFetchTimetableState(startDate, endDate);

    return (
        <LoadingIndicator isLoading={!lessons && !modifications && !events}>
            {() =>
                <Calendar
                    date={startDate}
                    events={events}
                    lessons={lessons}
                    modifications={modifications}
                />
            }
        </LoadingIndicator>
    );
};

export default memo(CalendarManager);
