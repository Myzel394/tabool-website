import {Dayjs} from "dayjs";

const getISODate = (date: Dayjs) => {
    return date.format("YYYY-MM-DD");
};

export default getISODate;
