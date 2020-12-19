import React, {useContext} from "react";

import LessonContext from "../LessonContext";

import SubmitFiles from "./SubmitFiles";
import UploadedSubmissions from "./UploadedSubmission";

const Submissions = () => {
    const {lesson} = useContext(LessonContext);
    const submissions = lesson.submissions;

    return (
        <>
            {submissions.length > 0 &&
                <UploadedSubmissions />
            }
            <SubmitFiles />
        </>
    );
};

export default Submissions;
