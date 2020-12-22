import {Dayjs} from "dayjs";

const getIsoDatetime = (date: Dayjs): string => {
    return date.format("YYYY-MM-DD HH:mm");
};

export default getIsoDatetime;
