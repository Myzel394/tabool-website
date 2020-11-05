import {Dayjs} from "dayjs";

const getISODate = (date: Dayjs): string => {
    return date.format("YYYY-MM-DD");
};

export default getISODate;
