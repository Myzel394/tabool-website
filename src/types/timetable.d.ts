import {Dayjs} from "dayjs";

import {LessonRelatedDetail} from "./lesson";
import {EventDetail} from "./event";
import {ExamDetail} from "./exam";
import {MaterialDetail} from "./material";
import {HomeworkDetail} from "./homework";
import {ModificationDetail} from "./modification";

export interface Timetable {
    lessons: LessonRelatedDetail[];
    events: EventDetail[];
    exams: ExamDetail[];
    homeworks: HomeworkDetail[];
    materials: MaterialDetail[];
    modifications: ModificationDetail[];
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}
