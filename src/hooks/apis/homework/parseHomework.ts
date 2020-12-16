import {convertToDate} from "api";
import {HomeworkDetail} from "types";

import {parseLesson} from "../lesson";

const parseHomework = (homework: HomeworkDetail): void => {
    convertToDate(homework, [
        "dueDate",
        "createdAt",
    ]);
    if (homework.lesson) {
        parseLesson(homework.lesson);
    }
};

export default parseHomework;
