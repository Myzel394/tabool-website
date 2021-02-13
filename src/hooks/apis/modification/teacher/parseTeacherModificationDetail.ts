import {TeacherModificationDetail} from "types";
import {convertToDate} from "api";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherModificationDetail = async (modification: TeacherModificationDetail) => {
    await parseTeacherLessonDateMixin(modification);
    convertToDate(modification, ["createdAt"]);
};

export default parseTeacherModificationDetail;
