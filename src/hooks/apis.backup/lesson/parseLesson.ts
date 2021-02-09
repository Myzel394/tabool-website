import {LessonDetail} from "types";
import {convertToDate} from "api";

import {parseCourse} from "../course";
import {parseMaterial} from "../material";
import {parseHomework} from "../homework";
import {parseModification} from "../modification";
import {parseSubmission} from "../submission";

const parseLesson = async (data: LessonDetail): Promise<void> => {
    convertToDate(data, [
        "date", "startTime", "endTime",
    ]);

    await Promise.allSettled([
        data && parseCourse(data.course),
        ...(data.homeworks ?? []).map(parseHomework),
        ...(data.submissions ?? []).map(parseSubmission),
        ...(data.materials ?? []).map(parseMaterial),
        ...(data.modifications ?? []).map(parseModification),
    ]);
};

export default parseLesson;
