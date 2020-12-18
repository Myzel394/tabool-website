import {LessonDetail} from "types";
import {convertToDate} from "api";

import {parseCourse} from "../course";
import {parseMaterial} from "../material";
import {parseHomework} from "../homework";
import {parseModification} from "../modification";
import {parseSubmission} from "../submission";

const parseLesson = async (data: LessonDetail): Promise<void> => {
    convertToDate(data, [
        "date", "lessonData.startTime", "lessonData.endTime",
    ]);
    if (data.lessonData) {
        parseCourse(data.lessonData.course);
    }

    await Promise.allSettled(data.homeworks.map(parseHomework));
    await Promise.allSettled(data.submissions.map(parseSubmission));
    data.materials.forEach(parseMaterial);
    data.modifications.forEach(parseModification);
};

export default parseLesson;
