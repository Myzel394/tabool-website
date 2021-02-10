import {Dayjs} from "dayjs";

import {LessonDateMixin} from "./lesson";

export interface StudentMaterialDetail extends LessonDateMixin {
    publishDatetime: Dayjs | null;
    name: string;
    file: string;
    id: string;
}

export interface TeacherMaterialDetail extends LessonDateMixin {
    publishDatetime: Dayjs | null;
    announce: boolean;
    name: string;
    file: string;
    createdAt: Dayjs;
    id: string;
}
