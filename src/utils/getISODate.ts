import {Dayjs} from "dayjs";

const getISODate = (date: Dayjs): string =>
    date.format("YYYY-MM-DD");

export default getISODate;
