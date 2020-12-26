import {convertToDate} from "api";
import {isAllDay} from "utils";
import {EventDetail} from "types";

const parseEvent = (event: EventDetail): void => {
    convertToDate(event, [
        "startDatetime",
        "endDatetime",
    ]);
    event.isAllDay = isAllDay(event.startDatetime, event.endDatetime);
};

export default parseEvent;
