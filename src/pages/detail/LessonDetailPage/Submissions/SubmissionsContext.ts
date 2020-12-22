import {LessonDetail, SubmissionDetail} from "types";
import {createContext} from "react";


export interface ISubmissionsContext {
    lesson: LessonDetail;
    submissions: SubmissionDetail[];
    onSubmissionsChange: (newSubmissions: SubmissionDetail[]) => any;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SubmissionsContext = createContext<ISubmissionsContext>(null);

export default SubmissionsContext;
