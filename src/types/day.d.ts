import {StudentLessonDetail, TeacherLessonDetail} from "./lesson";
import {StudentModificationDetail, TeacherModificationDetail} from "./modification";
import {StudentMaterialDetail, TeacherMaterialDetail} from "./material";
import {StudentExamDetail, TeacherExamDetail} from "./exam";
import {EventDetail} from "./event";
import {StudentClassbook, TeacherClassbook} from "./classbook";
import {StudentSubmissionDetail, TeacherSubmissionDetail} from "./submission";
import {StudentHomeworkDetail, TeacherHomeworkDetail} from "./homework";

export interface StudentWeekView {
    lessons: StudentLessonDetail[];
    modifications: StudentModificationDetail[];
    materials: StudentMaterialDetail[];
    exams: StudentExamDetail[];
    events: EventDetail[];
    homeworks: StudentHomeworkDetail[];
}

export interface TeacherWeekView {
    lessons: TeacherLessonDetail[];
    modifications: TeacherModificationDetail[];
    materials: TeacherMaterialDetail[];
    exams: TeacherExamDetail[];
    events: EventDetail[];
}

export interface StudentLessonView {
    classbook: StudentClassbook;
    materials: StudentMaterialDetail[];
    submissions: StudentSubmissionDetail[];
    modifications: StudentModificationDetail[];
    homeworks: StudentHomeworkDetail[];
    lessonInformation: StudentLessonDetail;
}

export interface TeacherLessonView {
    classbook: TeacherClassbook;
    materials: TeacherMaterialDetail[];
    submissions: TeacherSubmissionDetail[];
    modifications: TeacherModificationDetail[];
    homeworks: TeacherHomeworkDetail[];
    lessonInformation: TeacherLessonDetail;
}

export interface StudentDailyDataView {
    lessons: StudentLessonDetail[];
    modifications: StudentModificationDetail[];
    materials: StudentMaterialDetail[];
    exams: StudentExamDetail[];
    events: EventDetail[];
    homeworks: StudentHomeworkDetail[];
    classbookWithVideoConferences: StudentClassbook[];
}
