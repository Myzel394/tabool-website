import {convertToDate} from "api";
import {SubmissionApprox} from "types";

const parseSubmissionApprox = async (submission: SubmissionApprox): Promise<void> => {
    convertToDate(submission, ["uploadAt"]);
};

export default parseSubmissionApprox;
