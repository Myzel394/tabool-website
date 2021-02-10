import {StudentMaterialDetail} from "types";
import {convertToDate} from "api";

import {parseStudentLessonDateMixin} from "../../timetable";

const parseStudentMaterialDetail = async (material: StudentMaterialDetail) => {
    await parseStudentLessonDateMixin(material);
    convertToDate(material, ["publishDatetime"]);
};

export default parseStudentMaterialDetail;
