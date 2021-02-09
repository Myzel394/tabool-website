import {convertToDate} from "api";
import {ModificationApprox} from "types";

const parseModificationApprox = async (modification: ModificationApprox): Promise<void> => {
    convertToDate(modification, ["startDatetime", "endDatetime"]);
};

export default parseModificationApprox;
