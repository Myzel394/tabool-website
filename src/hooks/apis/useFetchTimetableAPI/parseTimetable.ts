import {Timetable} from "types";
import {convertToDate} from "api";

import {parseLesson} from "../lesson";
import {parseEvent} from "../event";
import {parseExam} from "../exam";

const parseTimetable = async (timetable: Timetable): Promise<void> => {
    await Promise.allSettled(timetable.lessons.map(parseLesson));

    timetable.events.forEach(parseEvent);
    timetable.exams.forEach(parseExam);

    convertToDate(timetable, ["earliestDateAvailable", "latestDateAvailable"]);
};

export default parseTimetable;
