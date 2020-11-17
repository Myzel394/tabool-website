import {Dayjs} from "dayjs";
import {PreferredIdType} from "./api";
import {LessonDetail} from "./lesson";

export interface MaterialApprox {
    lesson: string;
    name: string;
    addedAt: Dayjs;
    id: string;
}

export interface MaterialDetail extends MaterialApprox {
    file?: string;
    scoosoDownloadLink: string;
    lesson: PreferredIdType<LessonDetail>
}

