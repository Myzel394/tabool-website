import {Dayjs} from "dayjs";

import lazyDatetime from "./lazyDatetime";

const isDateEqual = (first: Dayjs, second: Dayjs): boolean =>
    lazyDatetime(first, "date") === lazyDatetime(second, "date");

export default isDateEqual;
