import dayjs, {Dayjs} from "dayjs";

const parseQueryDate = (date?: any): Dayjs | null => {
    if (typeof date === "string") {
        const value = dayjs(date);

        if (value.isValid()) {
            return value;
        }
    }

    return null;
};

export default parseQueryDate;
