import {Dayjs} from "dayjs";

const replaceDatetime = (value: Dayjs, replacement: "date" | "time"): Dayjs => {
    switch (replacement) {
    case "date":
        return value
            .set("year", 1)
            .set("month", 1)
            .set("date", 1);
    case "time":
        return value
            .set("hour", 1)
            .set("minute", 1)
            .set("second", 1)
            .set("millisecond", 1);
    default:
        throw new Error(`Invalid replacement option. (Got "${replacement}")`);
    }
};

export default replaceDatetime;
