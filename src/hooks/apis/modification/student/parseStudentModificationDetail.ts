import {StudentModificationDetail} from "types";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentModificationDetail = async (modification: StudentModificationDetail) => {
    await parseStudentLessonDateMixin(modification);
};

export default parseStudentModificationDetail;
