import {LessonRelatedDetail} from "types";
import {convertToDate} from "api";

import {parseCourse} from "../course";

const parseLessonRelatedDetail = async (data: LessonRelatedDetail): Promise<void> => {
    convertToDate(data, [
        "date", "lessonData.startTime", "lessonData.endTime",
    ]);

    await parseCourse(data.lessonData.course);
};

export default parseLessonRelatedDetail;
