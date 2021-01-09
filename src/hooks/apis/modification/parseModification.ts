import {convertToDate} from "api";
import {ModificationDetail} from "types";

const parseModification = async (modification: ModificationDetail): Promise<void> =>
    convertToDate(modification, ["startDatetime", "endDatetime"]);

export default parseModification;
