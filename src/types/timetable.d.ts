import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";
import {EventDetail} from "./event";

export interface Timetable {
    lessons: LessonDetail[];
    events: EventDetail[];
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}
