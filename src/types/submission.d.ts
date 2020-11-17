import {Dayjs} from "dayjs";

import {LessonDetail} from "./lesson";
import {PreferredIdType} from "./api";

export interface SubmissionApprox {
    lesson: strin;
    filename: string;
    uploadAt: Dayjs;
    id: string;
}

export interface SubmissionDetail extends SubmissionApprox {
    lesson: PreferredIdType<LessonDetail>;
    isUploaded: boolean;
}
