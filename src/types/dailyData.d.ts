import {Dayjs} from "dayjs";

import {LessonRelatedDetail} from "./lesson";
import {ModificationDetail} from "./modification";
import {HomeworkDetail} from "./homework";
import {ExamDetail} from "./exam";
import {EventDetail} from "./event";
import {MaterialDetail} from "./material";


export interface DailyData {
    lessons: LessonRelatedDetail[];
    videoConferenceLessons: LessonRelatedDetail[];
    modifications: ModificationDetail[];
    homeworks: HomeworkDetail[];
    materials: MaterialDetail[];
    exams: ExamDetail[];
    events: EventDetail[];
    earliestDateAvailable: Dayjs;
    latestDateAvailable: Dayjs;
}
