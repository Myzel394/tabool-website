import {Dayjs} from "dayjs";

import {StudentLessonDateMixin, TeacherLessonDateMixin} from "./lesson";

export interface StudentMaterialDetail extends StudentLessonDateMixin {
    publishDatetime: Dayjs | null;
    name: string;
    file: string;
    id: string;
}

export interface TeacherMaterialDetail extends TeacherLessonDateMixin {
    publishDatetime: Dayjs | null;
    announce: boolean;
    name: string;
    file: string;
    createdAt: Dayjs;
    id: string;
}
