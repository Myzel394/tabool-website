import {convertToDate} from "api";
import {HomeworkInformation} from "types";

const parseHomeworkInformation = async (homework: HomeworkInformation): Promise<void> => {
    convertToDate(homework, [
        "dueDateMin",
        "dueDateMax",
    ]);
};

export default parseHomeworkInformation;
