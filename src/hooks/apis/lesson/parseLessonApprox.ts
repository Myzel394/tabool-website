import {convertToDate} from "api";
import {LessonApprox} from "types";

const parseLessonApprox = async (lesson: LessonApprox): Promise<void> => {
    convertToDate(lesson, ["date", "startTime", "endTime"]);
};

export default parseLessonApprox;
