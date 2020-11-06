import {Dayjs} from "dayjs";

const combineDatetime = (date: Dayjs, time: Dayjs): Dayjs =>
    time
        .set("year", date.year())
        .set("month", date.month())
        .set("date", date.date());

export default combineDatetime;
