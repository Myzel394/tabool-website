import {TeacherModificationApprox} from "types";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherModificationApprox = async (modification: TeacherModificationApprox) => {
    await parseTeacherLessonDateMixin(modification);
};

export default parseTeacherModificationApprox;
