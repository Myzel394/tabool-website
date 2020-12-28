import {Dayjs} from "dayjs";

const getISODatetime = (date: Dayjs): string => {
    return date.format("YYYY-MM-DD HH:mm");
};

export default getISODatetime;
