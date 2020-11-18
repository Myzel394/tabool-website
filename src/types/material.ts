import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";

export interface MaterialApprox {
    lesson: string;
    name: string;
    addedAt: Dayjs;
    id: string;
}

export interface MaterialDetail extends Omit<MaterialApprox, "lesson"> {
    file?: string;
    scoosoDownloadLink: string;
    lesson: LessonDetail;
}
