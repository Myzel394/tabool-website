import {convertToDate} from "api";
import {LessonApprox} from "types";

const parseLessonApprox = (lesson: LessonApprox) => {
    convertToDate(lesson, ["lessonData.date"]);
};

export default parseLessonApprox;
