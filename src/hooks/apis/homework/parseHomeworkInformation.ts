import {convertToDate} from "api";
import {HomeworkInformation} from "types";

const parseHomeworkInformation = (homework: HomeworkInformation): void => {
    convertToDate(homework, [
        "dueDateMin",
        "dueDateMax",
    ]);
};

export default parseHomeworkInformation;
