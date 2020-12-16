import {LessonDetail} from "types";
import {convertToDate} from "api";

import {parseCourse} from "../course";
import {parseMaterial} from "../material";
import {parseHomework} from "../homework";
import {parseModification} from "../modification";

const parseLesson = (data: LessonDetail) => {
    convertToDate(data, [
        "date", "lessonData.startTime", "lessonData.endTime",
    ]);
    if (data.lessonData) {
        parseCourse(data.lessonData.course);
    }
    data.materials.forEach(material => parseMaterial(material));
    data.homeworks.forEach(homework => parseHomework(homework));
    data.modifications.forEach(modification => parseModification(modification));
};

export default parseLesson;
