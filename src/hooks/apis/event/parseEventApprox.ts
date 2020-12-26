import {convertToDate} from "api";
import {isAllDay} from "utils";
import {EventApprox} from "types";

const parseEventApprox = (event: EventApprox) => {
    convertToDate(event, [
        "startDatetime",
        "endDatetime",
    ]);
    event.isAllDay = isAllDay(event.startDatetime, event.endDatetime);
};

export default parseEventApprox;
