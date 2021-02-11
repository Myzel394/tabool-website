import {TeacherLessonView} from "types";

import {parseTeacherHomeworkDetail} from "../../homework";
import {parseStudentMaterialDetail} from "../../material";
import {parseTeacherModificationDetail} from "../../modification";
import {parseTeacherSubmissionDetail} from "../../submission";
import {parseTeacherClassbookDetail} from "../../classbook";

const parseTeacherLesson = async (lesson: TeacherLessonView) => {
    await Promise.allSettled([
        ...lesson.homeworks.map(parseTeacherHomeworkDetail),
        ...lesson.materials.map(parseStudentMaterialDetail),
        ...lesson.modifications.map(parseTeacherModificationDetail),
        ...lesson.submissions.map(parseTeacherSubmissionDetail),
        parseTeacherClassbookDetail(lesson.classbook),
    ]);
};

export default parseTeacherLesson;
