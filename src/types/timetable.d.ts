import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";
import {ModificationDetail} from "./modification";
import {EventDetail} from "./event";
import {HomeworkDetail} from "./homework";
import {MaterialDetail} from "./material";

export interface Timetable {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    events: EventDetail[];
    homeworks: HomeworkDetail[];
    materials: MaterialDetail[];
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}
