import React, {memo} from "react";
import {Event as CalendarEvent} from "react-big-calendar";
import dayjs, {Dayjs} from "dayjs";
import {combineDatetime} from "utils";

import DefaultCalendar from "../calendars/DefaultCalendar";

import SkeletonEvent from "./SkeletonEvent";

const createTime = (hours: number, minutes = 0): Dayjs => dayjs(new Date(
    2020, 1, 1, hours, minutes, 0,
));

const DEFAULT_TIMES = [
    [createTime(9), createTime(10)],
    [createTime(13), createTime(14)],
];

const generateSkeletonEvents = (fromDate: Dayjs, toDate: Dayjs, times: Dayjs[][] = DEFAULT_TIMES): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const diffInDays = toDate.diff(fromDate, "day");
    let currentDate = fromDate;

    for (let index = 0; index <= diffInDays; index++) {
        const isEven = index % 2 === 0;

        // Create events & push them to `events`
        for (const time of times) {
            const [startTime, endTime] = time;
            const startDatetime = combineDatetime(currentDate, startTime);
            const endDatetime = combineDatetime(currentDate, endTime);

            events.push({
                start: startDatetime.add(Number(isEven), "hour").toDate(),
                end: endDatetime.add(Number(isEven), "hour").toDate(),
                title: "Laden...",
            });
        }

        currentDate = currentDate.add(1, "day");
    }

    return events;
};

const Skeleton = ({startDate, endDate}) => {
    const events = generateSkeletonEvents(startDate, endDate);

    return (
        <DefaultCalendar
            events={events}
            eventComponent={SkeletonEvent}
        />
    );
};

export default memo(Skeleton);
