import {Dayjs} from "dayjs";

// eslint-disable-next-line import/no-cycle
import {LessonRelatedDetail} from "./lesson";

export interface MaterialApprox {
    name: string;
    addedAt: Dayjs;
    id: string;
    lesson?: string;
}

export interface MaterialDetail extends Omit<MaterialApprox, "lesson"> {
    isDeleted: boolean;
    lesson: LessonRelatedDetail;

    size?: number;
    file?: string;
    scoosoDownloadLink?: string;
}
