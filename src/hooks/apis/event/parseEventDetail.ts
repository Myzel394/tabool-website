import {EventDetail} from "types";
import {convertToDate} from "api";

const parseEventDetail = async (event: EventDetail) => {
    convertToDate(event, ["startDatetime", "endDatetime"]);
};

export default parseEventDetail;
