import {Dayjs} from "dayjs";

// eslint-disable-next-line import/no-cycle
import {LessonRelatedDetail} from "./lesson";
import {Subject} from "./subject";

export interface MaterialApprox {
    name: string;
    addedAt: Dayjs;
    id: string;
    lesson: string;
    subject: Subject;
    size?: number | null;
}

export interface MaterialDetail extends Omit<MaterialApprox, "lesson"> {
    isDeleted: boolean;
    lesson: LessonRelatedDetail;

    size?: number | null;
    file?: string;
    scoosoDownloadLink?: string;
}
