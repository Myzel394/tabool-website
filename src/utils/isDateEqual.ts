import {Dayjs} from "dayjs";

import replaceDatetime from "./replaceDatetime";

const isDateEqual = (first: Dayjs, second: Dayjs): boolean =>
    replaceDatetime(first, "time").isSame(replaceDatetime(second, "time"));

export default isDateEqual;
