import {StudentLessonView} from "types";

import {parseStudentHomeworkDetail} from "../../homework";
import {parseStudentMaterialDetail} from "../../material";
import {parseStudentModificationDetail} from "../../modification";
import {parseStudentSubmissionDetail} from "../../submission";
import {parseStudentClassbookDetail} from "../../classbook";
import {parseStudentLessonDetail} from "../../timetable";

const parseStudentLesson = async (lesson: StudentLessonView) => {
    await Promise.allSettled([
        ...lesson.homeworks.map(parseStudentHomeworkDetail),
        ...lesson.materials.map(parseStudentMaterialDetail),
        ...lesson.modifications.map(parseStudentModificationDetail),
        ...lesson.submissions.map(parseStudentSubmissionDetail),
        parseStudentClassbookDetail(lesson.classbook),
        parseStudentLessonDetail(lesson.lessonInformation),
    ]);
};

export default parseStudentLesson;
