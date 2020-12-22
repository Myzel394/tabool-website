import dayjs from "dayjs";
import {Event as CalendarEvent} from "react-big-calendar";

import combineDatetime from "./combineDatetime";
import replaceDatetime from "./replaceDatetime";

export const TIME_PADDING = 20;
export const DEFAULT_MIN_TIME = dayjs()
    .set("hour", 8)
    .set("minute", 0)
    .set("second", 0);
export const DEFAULT_MAX_TIME = dayjs()
    .set("hour", 16)
    .set("minute", 0)
    .set("second", 0);

const getMinMaxTime = (events: CalendarEvent[]): [Date, Date] => {
    const notAllDayEvents = events.filter(element => !element.allDay);

    const startTimes = notAllDayEvents.map(element =>
        replaceDatetime(dayjs(element.start), "date").unix());
    const endTimes = notAllDayEvents.map(element =>
        replaceDatetime(dayjs(element.end), "date").unix());
    const minUnix = Math.min(...startTimes);
    const maxUnix = Math.max(...endTimes);

    const minTime = dayjs.unix(minUnix);
    const maxTime = dayjs.unix(maxUnix);

    const minDatetime = combineDatetime(dayjs(), minTime).subtract(TIME_PADDING, "minute");
    const maxDatetime = combineDatetime(dayjs(), maxTime).add(TIME_PADDING, "minute");

    return [
        (minDatetime.isValid() ? minDatetime : DEFAULT_MIN_TIME).toDate(),
        (maxDatetime.isValid() ? maxDatetime : DEFAULT_MAX_TIME).toDate(),
    ];
};

export default getMinMaxTime;
