import {Dayjs} from "dayjs";

// eslint-disable-next-line import/no-cycle
import {LessonRelatedDetail} from "./lesson";

export interface SubmissionApprox {
    lesson: string;
    filename: string;
    size: number;
    id: string;
}

export interface SubmissionDetail extends Omit<SubmissionApprox, "lesson"> {
    lesson: LessonRelatedDetail;
    isUploaded: boolean;
    uploadDate: Dayjs | null;
    createdAt: Dayjs;
    file: string;
}
