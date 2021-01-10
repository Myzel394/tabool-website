import {HomeworkApprox} from "types";
import {convertToDate} from "api";

const parseHomeworkApprox = async (homework: HomeworkApprox): Promise<void> => {
    convertToDate(homework, ["dueDate", "createdAt"]);
};

export default parseHomeworkApprox;
