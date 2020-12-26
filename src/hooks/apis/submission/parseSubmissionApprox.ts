import {convertToDate} from "api";
import {SubmissionApprox} from "types";

const parseSubmissionApprox = (submission: SubmissionApprox): void => {
    convertToDate(submission, ["uploadAt"]);
};

export default parseSubmissionApprox;
