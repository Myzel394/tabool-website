import {LessonDetail, SubmissionDetail} from "types";
import {createContext} from "react";


export interface ILessonContext {
    lesson: LessonDetail;
    onChange: (newSubmissions: SubmissionDetail[]) => any;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const LessonContext = createContext<ILessonContext>(null);

export default LessonContext;
