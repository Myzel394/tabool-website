import {convertToDate} from "api";
import {ModificationApprox} from "types";

const parseModificationApprox = (modification: ModificationApprox) => convertToDate(modification, ["startDatetime", "endDatetime"]);

export default parseModificationApprox;
