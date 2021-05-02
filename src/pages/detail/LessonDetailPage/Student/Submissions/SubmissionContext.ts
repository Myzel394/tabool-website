import {StudentLessonDetail, StudentSubmissionDetail} from "types";
import {createContext, Dispatch, SetStateAction} from "react";
import {Dayjs} from "dayjs";

export interface ISubmissionContext {
    submissions: StudentSubmissionDetail[];
    onSubmissionsChange: Dispatch<SetStateAction<StudentSubmissionDetail[]>>;

    lesson: StudentLessonDetail;
    lessonDate: Dayjs;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SubmissionContext = createContext<ISubmissionContext>();

export default SubmissionContext;
