import {Dayjs} from "dayjs";

const getISOTime = (date: Dayjs): string =>
    date.format("HH:mm:ss");

export default getISOTime;
