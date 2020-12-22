import dayjs, {Dayjs} from "dayjs";

import {LessonDate} from "./getNextLessonDate";

import {combineDatetime, getNextLessonDate} from ".";

const expectDatesSame = (firstDate: Dayjs, secondDate: Dayjs) => expect(firstDate.isSame(secondDate)).toBeTruthy();

describe("getNextLessonDate works with lessons", () => {
    const startTime = dayjs(new Date(1, 1, 1, 8, 0, 0));
    const endTime = dayjs(new Date(1, 1, 1, 10, 0, 0));

    // Wednesday
    const date = dayjs(new Date(2020, 11, 23, 10, 0, 0));

    it("same week", () => {
        // Time doesn't matter
        const lessonDates: LessonDate[] = [
            // This should be selected
            {
                weekday: 4,
                startTime,
                endTime,
            },
            {
                weekday: 5,
                startTime,
                endTime,
            },
        ];

        const expectedDate = combineDatetime(dayjs(new Date(2020, 11, 24)), startTime);
        const actualDate = getNextLessonDate(date, lessonDates);

        expectDatesSame(actualDate, expectedDate);
    });

    it("next week", () => {
        // Time doesn't matter
        const lessonDates: LessonDate[] = [
            {
                weekday: 2,
                startTime,
                endTime,
            },
            // This should be selected
            {
                weekday: 1,
                startTime,
                endTime,
            },
        ];

        const expectedDate = combineDatetime(dayjs(new Date(2020, 11, 28)), startTime);
        const actualDate = getNextLessonDate(date, lessonDates);

        expectDatesSame(actualDate, expectedDate);
    });

    it("same week (lesson active)", () => {
        const startTime = date.subtract(1, "hour");

        const lessonDates: LessonDate[] = [
            // Lesson active
            {
                weekday: 3,
                startTime,
                endTime: date.add(1, "hour"),
            },
            // This should be selected
            {
                weekday: 4,
                startTime,
                endTime,
            },
        ];

        const expectedDate = combineDatetime(dayjs(new Date(2020, 11, 24)), startTime);
        const actualDate = getNextLessonDate(date, lessonDates);

        expectDatesSame(actualDate, expectedDate);
    });

    it("same week (lesson on same day)", () => {
        const startTime = date.add(1, "hour");

        const lessonDates: LessonDate[] = [
            // This should be selected
            {
                weekday: 3,
                startTime,
                endTime: date.add(2, "hour"),
            },
            {
                weekday: 4,
                startTime,
                endTime,
            },
        ];

        const expectedDate = combineDatetime(dayjs(new Date(2020, 11, 23)), startTime);
        const actualDate = getNextLessonDate(date, lessonDates);

        expectDatesSame(actualDate, expectedDate);
    });

    it("next week (lesson active)", () => {
        const startTime = date.subtract(1, "hour");

        const lessonDates: LessonDate[] = [
            // Lesson active
            {
                weekday: 3,
                startTime,
                endTime: date.add(1, "hour"),
            },
            // This should be selected
            {
                weekday: 2,
                startTime,
                endTime,
            },
        ];

        const expectedDate = combineDatetime(dayjs(new Date(2020, 11, 29)), startTime);
        const actualDate = getNextLessonDate(date, lessonDates);

        expectDatesSame(actualDate, expectedDate);
    });
});
