import {TeacherMaterialDetail} from "types";
import {convertToDate} from "api";
import dayjs from "dayjs";

import {parseTeacherLessonDateMixin} from "../../timetable";

const parseTeacherMaterialDetail = async (material: TeacherMaterialDetail) => {
    await parseTeacherLessonDateMixin(material);
    convertToDate(material, ["publishDatetime", "createdAt"]);

    material.isUploaded = function() {
        return this.publishDatetime.isBefore(dayjs());
    };
};

export default parseTeacherMaterialDetail;
