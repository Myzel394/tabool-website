import {Dayjs} from "dayjs";

const getISODatetime = (date: Dayjs): string =>
    date.format("YYYY-MM-DD[T]HH:mm:ss");

export default getISODatetime;
