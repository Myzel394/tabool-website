import {Timetable} from "types";
import {convertToDate} from "api";

import {parseLesson} from "../lesson";
import {parseEvent} from "../event";
import {parseHomework} from "../homework";
import {parseMaterial} from "../material";
import {parseModification} from "../modification";

const parseTimetable = (timetable: Timetable): void => {
    timetable.lessons.forEach(parseLesson);
    timetable.events.forEach(parseEvent);
    timetable.homeworks.forEach(parseHomework);
    timetable.materials.forEach(parseMaterial);
    timetable.modifications.forEach(parseModification);
    convertToDate(timetable, ["earliestDateAvailable", "latestDateAvailable"]);
};

export default parseTimetable;
