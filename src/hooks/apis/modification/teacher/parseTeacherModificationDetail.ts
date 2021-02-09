import {StudentModificationDetail} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseTeacherModificationDetail = async (modification: StudentModificationDetail) => {
    await parseStudentLessonDateMixin(modification);
    convertToDate(modification, ["createdAt"]);
};

export default parseTeacherModificationDetail;
