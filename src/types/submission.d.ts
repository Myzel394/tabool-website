import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";

export interface SubmissionApprox {
    lesson: strin;
    filename: string;
    uploadAt: Dayjs;
    id: string;
}

export interface SubmissionDetail extends SubmissionApprox {
    lesson: LessonDetail;
    isUploaded: boolean;
}
