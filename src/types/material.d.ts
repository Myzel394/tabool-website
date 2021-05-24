import {Dayjs} from "dayjs";

import {StudentLessonDateMixin, TeacherLessonDateMixin} from "./lesson";

export interface StudentMaterialDetail extends StudentLessonDateMixin {
    publishDatetime: Dayjs;
    name: string;
    file: string;
    size: number;
    id: string;
}

export interface TeacherMaterialDetail extends TeacherLessonDateMixin {
    publishDatetime: Dayjs;
    announce: boolean;
    name: string;
    file: string;
    size: number;
    createdAt: Dayjs;
    id: string;
}
