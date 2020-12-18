import {convertToDate} from "api";
import {ModificationDetail} from "types";

const parseModification = (modification: ModificationDetail) =>
    convertToDate(modification, ["startDatetime", "endDatetime"]);

export default parseModification;
