import {HomeworkApprox} from "types";
import {convertToDate} from "api";

const parseHomeworkApprox = (homework: HomeworkApprox): void => {
    convertToDate(homework, ["dueDate", "createdAt"]);
};

export default parseHomeworkApprox;
