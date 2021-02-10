import {TeacherSubmissionDetail} from "types";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherSubmissionDetail = async (submission: TeacherSubmissionDetail) => {
    await parseTeacherLessonDateMixin(submission);
};

export default parseTeacherSubmissionDetail;
