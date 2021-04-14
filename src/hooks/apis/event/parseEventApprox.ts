import {convertToDate} from "api";
import {isAllDay} from "utils";
import {EventApprox} from "types";

const parseEventApprox = async (event: EventApprox): Promise<void> => {
    convertToDate(event, [
        "startDatetime",
        "endDatetime",
    ]);
    event.isAllDay = isAllDay(event.startDatetime, event.endDatetime);
};

export default parseEventApprox;