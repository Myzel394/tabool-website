import {StudentLessonDetail, TeacherLessonDetail} from "./lesson";
import {StudentModificationDetail, TeacherModificationDetail} from "./modification";
import {StudentMaterialDetail, TeacherMaterialDetail} from "./material";
import {StudentExamDetail, TeacherExamDetail} from "./exam";
import {EventDetail} from "./event";
import {StudentClassbook, TeacherClassbook} from "./classbook";
import {StudentSubmissionDetail, TeacherSubmissionDetail} from "./submission";
import {StudentHomeworkDetail, TeacherHomeworkDetail} from "./homework";

export interface StudentDayView {
    lessons: StudentLessonDetail[];
    modifications: StudentModificationDetail[];
    materials: StudentMaterialDetail[];
    exams: StudentExamDetail[];
    events: EventDetail[];
}

export interface TeacherDayView {
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
}

export interface TeacherLessonView {
    classbook: TeacherClassbook;
    materials: TeacherMaterialDetail[];
    submissions: TeacherSubmissionDetail[];
    modifications: TeacherModificationDetail[];
    homeworks: TeacherHomeworkDetail[];
}
