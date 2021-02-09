import {TeacherModificationApprox} from "types";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseTeacherModificationApprox = async (modification: TeacherModificationApprox) => {
    await parseStudentLessonDateMixin(modification);
};

export default parseTeacherModificationApprox;
