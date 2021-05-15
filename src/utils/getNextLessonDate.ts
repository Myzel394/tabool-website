import {Dayjs} from "dayjs";
import _ from "lodash";

import findNextDate from "./findNextDate";
import replaceDatetime from "./replaceDatetime";
import combineDatetime from "./combineDatetime";

export interface LessonDate {
    weekday: number;
    startTime: Dayjs;
    endTime: Dayjs;
}

// 4, [1, 2, 5] -> 5
// 4, [1, 2, 3] -> 1

const getNextLessonDate = (startDate: Dayjs, lessonDates: LessonDate[]): Dayjs => {
    let targetedWeekDay: number;
    let targetedTime: Dayjs;
    const startDateWeekDay = startDate.day();

    // Filter
    const sortedLessonDates = _.orderBy(lessonDates, "weekday");
    const filteredSameWeekLessonDates = sortedLessonDates.filter(lessonDate => lessonDate.weekday >= startDateWeekDay);
    const filteredTimesSameWeekLessonDates = filteredSameWeekLessonDates.filter(lessonDate => {
        // Filter start and end time if it's the current weekday
        if (lessonDate.weekday === startDateWeekDay) {
            const time = replaceDatetime(startDate, "date");

            return replaceDatetime(lessonDate.startTime, "date").isAfter(time);
        }
        return true;
    });

    if (filteredTimesSameWeekLessonDates.length === 0) {
        // startDate's week contains no more lessons, so take the first one of the next week
        const firstLesson = sortedLessonDates[0];
        targetedWeekDay = firstLesson.weekday;
        targetedTime = firstLesson.startTime;
    } else {
        // Get the next lesson
        const nextLesson = filteredTimesSameWeekLessonDates[0];
        targetedWeekDay = nextLesson.weekday;
        targetedTime = nextLesson.startTime;
    }

    const nextDate = findNextDate(startDate, targetedWeekDay);

    return combineDatetime(nextDate, targetedTime);
};

export default getNextLessonDate;
