import {TeacherLessonDateMixin} from "types";
import {convertToDate} from "api";

import {parseTeacherLessonDetail} from "./teacher";

const parseTeacherLessonDateMixin = async (mixin: TeacherLessonDateMixin) => {
    await parseTeacherLessonDetail(mixin.lesson);
    convertToDate(mixin, ["lessonDate"]);
};

export default parseTeacherLessonDateMixin;
