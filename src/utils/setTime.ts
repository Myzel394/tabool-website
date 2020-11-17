import {Dayjs} from "dayjs";

export const setBeginTime = (value: Dayjs): Dayjs => value
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);

export const setEndTime = (value: Dayjs): Dayjs => value
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .set("millisecond", 999)
