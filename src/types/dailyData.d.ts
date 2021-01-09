import {LessonDetail} from "./lesson";
import {ModificationDetail} from "./modification";
import {HomeworkDetail} from "./homework";
import {ExamDetail} from "./exam";
import {EventDetail} from "./event";

export interface DailyData {
    lessons: LessonDetail[];
    modifications: ModificationDetail[];
    homeworks: HomeworkDetail[];
    exams: ExamDetail[];
    events: EventDetail[];
    videoConferenceLessons: LessonDetail[];
}
