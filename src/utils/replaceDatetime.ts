import dayjs, {Dayjs} from "dayjs";

const replaceDatetime = (value: Dayjs, replacement: "date" | "time"): Dayjs => {
    const today = dayjs();

    switch (replacement) {
        case "date":
            return value
                .set("year", today.year())
                .set("month", today.month())
                .set("date", today.date())
        case "time":
            return value
                .set("hour", today.hour())
                .set("minute", today.minute())
                .set("second", today.second())
                .set("millisecond", today.millisecond())
        default:
            throw new Error(`Invalid replacement option. (Got "${replacement}")`)
    }
}

export default replaceDatetime;
