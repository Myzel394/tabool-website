import React, {memo} from "react";
import {LessonDetail, SubmissionDetail} from "types";
import {useInheritedState} from "hooks";
import {useTranslation} from "react-i18next";

import SubmissionsContext from "./SubmissionsContext";

export interface ISubmissions {
    lesson: LessonDetail;
}

const Submissions = ({lesson}: ISubmissions) => {
    const {t} = useTranslation();
    const [submissions, setSubmissions] = useInheritedState<SubmissionDetail[]>(lesson.submissions);

    return (
        <SubmissionsContext.Provider
            value={{
                lesson,
                submissions,
                onSubmissionsChange: setSubmissions,
            }}
        >
            {/*
            {submissions.length > 0 &&
                <UploadedSubmissions />
            }
            <SubmitFiles />*/}
            <p>{t("Einsendungen sind momentan deaktiviert")}</p>
        </SubmissionsContext.Provider>
    );
};

export default memo(Submissions);
