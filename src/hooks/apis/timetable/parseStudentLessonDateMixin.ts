import {LessonDateMixin} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDetail} from "./student";

const parseStudentLessonDateMixin = async (mixin: LessonDateMixin) => {
    await parseStudentLessonDetail(mixin.lesson);
    convertToDate(mixin, ["lessonDate"]);
};

export default parseStudentLessonDateMixin;
