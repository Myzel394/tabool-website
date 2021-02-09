import {DailyData} from "types";
import {convertToDate} from "api";

import {parseEvent} from "../event";
import {parseExam} from "../exam";
import {parseLessonRelatedDetail} from "../lesson";
import {parseHomework} from "../homework";
import {parseModification} from "../modification";

const parseFetchDailyData = async (data: DailyData): Promise<void> => {
    convertToDate(data, [
        "earliestDateAvailable",
        "latestDateAvailable",
    ]);

    await Promise.allSettled([
        ...data.events.map(parseEvent),
        ...data.exams.map(parseExam),
        ...data.homeworks.map(parseHomework),
        ...data.lessons.map(parseLessonRelatedDetail),
        ...data.modifications.map(parseModification),
        ...data.videoConferenceLessons.map(parseLessonRelatedDetail),
    ]);
};

export default parseFetchDailyData;
