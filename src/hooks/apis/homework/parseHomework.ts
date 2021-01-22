import {convertToDate} from "api";
import {HomeworkDetail} from "types";
import {createShort} from "utils";


const parseHomework = async (homework: HomeworkDetail): Promise<void> => {
    convertToDate(homework, [
        "dueDate",
        "createdAt",
    ]);
    homework.truncatedInformation = createShort(homework.information);
    if (homework.lesson) {
        const lesson = await import("../lesson");
        await lesson.parseLesson(homework.lesson);
    }
};

export default parseHomework;
