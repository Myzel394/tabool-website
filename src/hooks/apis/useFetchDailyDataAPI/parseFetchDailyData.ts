import {DailyData} from "types";

import {parseEvent} from "../event";
import {parseExam} from "../exam";
import {parseLesson} from "../lesson";
import {parseHomework} from "../homework";
import {parseModification} from "../modification";

const parseFetchDailyData = async (data: DailyData): Promise<void> => {
    await Promise.allSettled([
        ...data.events.map(parseEvent),
        ...data.exams.map(parseExam),
        ...data.homeworks.map(parseHomework),
        ...data.lessons.map(parseLesson),
        ...data.modifications.map(parseModification),
        ...data.videoConferenceLessons.map(parseLesson),
    ]);
};

export default parseFetchDailyData;
