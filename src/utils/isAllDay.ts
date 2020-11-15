import {Dayjs} from "dayjs";

const isAllDay = (startDate: Dayjs, endDate: Dayjs): boolean => {
    const isStartDateBegin = startDate.hour() === 0 &&
        startDate.minute() === 0 &&
        startDate.second() === 0;
    const isEndDateEnd = endDate.hour() === 23 &&
        endDate.minute() === 59 &&
        endDate.second() === 59;
    const isSameDay = startDate.day() === endDate.day() &&
        startDate.month() === endDate.month() &&
        startDate.year() === endDate.year();
    const isSame = startDate.isSame(endDate) && isStartDateBegin;
    const isFullDay = isStartDateBegin && isEndDateEnd && isSameDay;
    const isNextDay = startDate.add(1, "day").isSame(endDate);
    return isSame || isFullDay || isNextDay;
};


export default isAllDay;
