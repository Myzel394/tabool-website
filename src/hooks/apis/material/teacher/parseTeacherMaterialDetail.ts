import {TeacherMaterialDetail} from "types";
import {convertToDate} from "api";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherMaterialDetail = async (material: TeacherMaterialDetail) => {
    await parseTeacherLessonDateMixin(material);
    convertToDate(material, ["publishDatetime", "createdAt"]);
};

export default parseTeacherMaterialDetail;
