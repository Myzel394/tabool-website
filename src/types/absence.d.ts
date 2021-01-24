// eslint-disable-next-line import/no-cycle
import {LessonRelatedDetail} from "./lesson";

export interface Absence {
    reason: string;
    isSigned: boolean;
    id: string;
    lesson: LessonRelatedDetail;
}
