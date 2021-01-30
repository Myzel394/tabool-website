import {LessonRelatedDetail} from "types";
import {convertToDate} from "api";

import {parseCourse} from "../course";

const parseLessonRelatedDetail = async (data: LessonRelatedDetail): Promise<void> => {
    convertToDate(data, [
        "date", "startTime", "endTime",
    ]);

    await parseCourse(data.course);
};

export default parseLessonRelatedDetail;
