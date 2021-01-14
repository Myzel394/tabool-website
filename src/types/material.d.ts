import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";

export interface MaterialApprox {
    name: string;
    addedAt: Dayjs;
    id: string;
    lesson?: string;
}

export interface MaterialDetail extends Omit<MaterialApprox, "lesson"> {
    isDeleted: boolean;

    lesson?: LessonDetail;
    size?: number;
    file?: string;
    scoosoDownloadLink?: string;
}
