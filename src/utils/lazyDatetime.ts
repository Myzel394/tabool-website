import dayjs, {Dayjs} from "dayjs";

import getISODate from "./getISODate";
import getISODatetime from "./getISODatetime";
import getISOTime from "./getISOTime";

export type AvailableDatetimeType = "date" | "datetime" | "time";

const lazyDatetime = (value: Dayjs | null | undefined, type: AvailableDatetimeType = "datetime"): string | null => {
    if (!value || !dayjs.isDayjs(value)) {
        return null;
    }

    switch (type) {
        case "date":
            return getISODate(value);
        case "datetime":
            return getISODatetime(value);
        case "time":
            return getISOTime(value);
    }
};

export default lazyDatetime;
