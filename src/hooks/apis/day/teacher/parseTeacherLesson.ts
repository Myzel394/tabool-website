import {TeacherLessonView} from "types";

import {parseTeacherHomeworkDetail} from "../../homework";
import {parseTeacherMaterialDetail} from "../../material";
import {parseTeacherModificationDetail} from "../../modification";
import {parseTeacherSubmissionDetail} from "../../submission";
import {parseTeacherClassbookDetail} from "../../classbook";
import {parseTeacherLessonDetail} from "../../timetable";

const parseTeacherLesson = async (lesson: TeacherLessonView) => {
    await Promise.allSettled([
        ...lesson.homeworks.map(parseTeacherHomeworkDetail),
        ...lesson.materials.map(parseTeacherMaterialDetail),
        ...lesson.modifications.map(parseTeacherModificationDetail),
        ...lesson.submissions.map(parseTeacherSubmissionDetail),
        lesson.classbook && parseTeacherClassbookDetail(lesson.classbook),
        parseTeacherLessonDetail(lesson.lessonInformation),
    ]);
};

export default parseTeacherLesson;
