import {convertToDate} from "api";
import {HomeworkDetail} from "types";


const parseHomework = async (homework: HomeworkDetail): Promise<void> => {
    convertToDate(homework, [
        "dueDate",
        "createdAt",
    ]);
    if (homework.lesson) {
        const lesson = await import("../lesson");
        lesson.parseLesson(homework.lesson);
    }
};

export default parseHomework;
