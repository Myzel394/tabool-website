import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";
import {EventDetail} from "./event";
import {ExamDetail} from "./exam";

export interface Timetable {
    lessons: LessonDetail[];
    events: EventDetail[];
    exams: ExamDetail[];
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}
