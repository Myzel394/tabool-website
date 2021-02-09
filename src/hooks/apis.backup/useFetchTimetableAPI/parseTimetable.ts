import {Timetable} from "types";
import {convertToDate} from "api";

import {parseLessonRelatedDetail} from "../lesson";
import {parseEvent} from "../event";
import {parseExam} from "../exam";

const parseTimetable = async (timetable: Timetable): Promise<void> => {
    convertToDate(timetable, ["earliestDateAvailable", "latestDateAvailable"]);
    await Promise.allSettled([
        ...timetable.lessons.map(parseLessonRelatedDetail),
        ...timetable.events.map(parseEvent),
        ...timetable.exams.map(parseExam),
    ]);
};

export default parseTimetable;
