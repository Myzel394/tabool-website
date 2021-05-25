import dayjs, {Dayjs} from "dayjs";
import sortArray from "sort-array";

import findNextDate from "./findNextDate";
import combineDatetime from "./combineDatetime";
import replaceDatetime from "./replaceDatetime";

export interface LessonDate {
    weekday: number;
    startTime: Dayjs;
    endTime: Dayjs;
}

// 4, [1, 2, 5] -> 5
// 4, [1, 2, 3] -> 1

const getNextLessonDate = (startDate: Dayjs, lessonDates: LessonDate[]): Dayjs => {
    let targetedDate: Dayjs;

    const nextDates = sortArray(
        lessonDates
            .map(date =>
                findNextDate(
                    replaceDatetime(startDate, "date"),
                    date.weekday,
                ).unix()),
        {
            order: "asc",
        },
    )
        .map(unix => dayjs.unix(unix))
        .filter(date => date.isAfter(replaceDatetime(startDate, "date")));

    // Check if lesson is active
    if (nextDates.length >= 1) {
        const weekday = nextDates[0].day();
        const earliestTime = replaceDatetime(nextDates[0], "date");

        if (
            lessonDates.some(date => {
                const startTime = replaceDatetime(date.startTime, "date");
                const endTime = replaceDatetime(date.endTime, "date");

                const isSameWeekday = weekday === date.weekday;
                const isBetween = (
                    earliestTime.isAfter(startTime) &&
                    earliestTime.isBefore(endTime)
                );
                const isBefore = (
                    earliestTime.isAfter(startTime) &&
                    earliestTime.isAfter(endTime)
                );

                return (
                    isSameWeekday &&
                    (
                        isBetween || isBefore
                    )
                );
            })
        ) {
            nextDates.splice(0, 1);
        }
    }

    if (nextDates.length === 0) {
        // Get first day of next week
        const nextWeekWeekday = Math.min(...lessonDates.map(date => date.weekday));
        const startTime = lessonDates.find(date => date.weekday === nextWeekWeekday)!.startTime;
        // Add 1 day to ensure the next day is next week
        const date = findNextDate(startDate.add(1, "day"), nextWeekWeekday);

        targetedDate = combineDatetime(date, startTime);
    } else {
        const weekday = nextDates[0].day();
        const startTime = lessonDates.find(date => date.weekday === weekday)!.startTime;
        const date = findNextDate(startDate, weekday);

        targetedDate = combineDatetime(date, startTime);
    }

    return targetedDate;
};

export default getNextLessonDate;
