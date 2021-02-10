import {LessonDateMixin} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDetail} from "./student";

const parseStudentLessonDateMixin = async (mixin: LessonDateMixin): Promise<void> => {
    await parseStudentLessonDetail(mixin.lesson);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    convertToDate<LessonDateMixin>(mixin, ["lessonDate"]);
};

export default parseStudentLessonDateMixin;
