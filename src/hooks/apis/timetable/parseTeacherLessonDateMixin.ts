import {TeacherLessonDateMixin} from "types";
import {convertToDate} from "api";

import {parseTeacherLessonDetail} from "./teacher";

const parseTeacherLessonDateMixin = async (mixin: TeacherLessonDateMixin) => {
    await parseTeacherLessonDetail(mixin.lesson);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    convertToDate(mixin, ["lessonDate"]);
};

export default parseTeacherLessonDateMixin;
