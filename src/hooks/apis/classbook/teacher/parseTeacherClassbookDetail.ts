import {TeacherClassbook} from "types";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherClassbookDetail = async (classbook: TeacherClassbook) => {
    await parseTeacherLessonDateMixin(classbook);
};

export default parseTeacherClassbookDetail;
