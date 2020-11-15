import dayjs, {Dayjs} from "dayjs";

import isAllDay from "./isAllDay";

describe("isAllDay", () => {
    const setBegin = (value: Dayjs): Dayjs => value
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0);
    const setEnd = (value: Dayjs): Dayjs => value
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59)
        .set("millisecond", 999);
    const today = dayjs();

    test("works with same beginnings", () => {
        const firstDate = setBegin(today);
        const secondDate = setBegin(today);

        const result = isAllDay(firstDate, secondDate);
        expect(result).toEqual(true);
    });

    test("works with full range dates", () => {
        const firstDate = setBegin(today);
        const secondDate = setEnd(today);

        const result = isAllDay(firstDate, secondDate);
        expect(result).toEqual(true);
    });

    test("works with end date being one day after start date", () => {
        const firstDate = setBegin(today);
        const secondDate = setBegin(today).add(1, "day");

        const result = isAllDay(firstDate, secondDate);
        expect(result).toEqual(true);
    });


    test("works NOT with different dates but same beginnings", () => {
        const firstDate = setBegin(today);
        const secondDate = setBegin(today).add(3, "day");

        const result = isAllDay(firstDate, secondDate);
        expect(result).toEqual(false);
    });

    test("works NOT with different dates but range", () => {
        const firstDate = setBegin(today);
        const secondDate = setEnd(today).add(1, "day");

        const result = isAllDay(firstDate, secondDate);
        expect(result).toEqual(false);
    });

    test("works NOT with next date but different time", () => {
        const firstDate = setBegin(today);
        const secondDate = setBegin(today).add(1, "day").add(1, "minute");

        const result = isAllDay(firstDate, secondDate);
        expect(result).toEqual(false);
    });
});

