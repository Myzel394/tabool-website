import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";

export interface SubmissionApprox {
    lesson?: string;
    filename: string;
    uploadAt: Dayjs;
    size: number;
    id: string;
}

export interface SubmissionDetail extends Omit<SubmissionApprox, "lesson"> {
    lesson?: LessonDetail;
    isUploaded: boolean;
}
