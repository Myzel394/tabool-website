import {Dayjs} from "dayjs";
import replaceDatetime from "./replaceDatetime";

const isAllDay = (startDate: Dayjs, endDate: Dayjs): boolean =>
    replaceDatetime(startDate, "date")
        .isSame(replaceDatetime(endDate, "date"));


export default isAllDay;
