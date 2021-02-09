import {StudentModificationApprox} from "types";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentModificationApprox = async (modification: StudentModificationApprox) => {
    await parseStudentLessonDateMixin(modification);
};

export default parseStudentModificationApprox;
