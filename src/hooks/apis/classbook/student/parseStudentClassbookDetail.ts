import {StudentClassbook} from "types";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentClassbookDetail = async (classbook: StudentClassbook) => {
    await parseStudentLessonDateMixin(classbook);
};

export default parseStudentClassbookDetail;
