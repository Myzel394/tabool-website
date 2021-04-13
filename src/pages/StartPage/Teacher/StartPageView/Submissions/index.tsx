import React, {useContext} from "react";
import {Grid} from "@material-ui/core";
import {TeacherSubmissionDetail} from "types";
import {getPerUniqueValue, lazyDatetime} from "utils";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";

import StartPageContext from "../../StartPageContext";

import SubmissionsList from "./SubmissionsList";


const getKey = (submission: TeacherSubmissionDetail): string =>
    `${submission.lesson.id}.${lazyDatetime(submission.lessonDate, "date")}`;

const Submissions = () => {
    const {t} = useTranslation();
    const {
        dailyData: {submissions},
    } = useContext(StartPageContext);
    const submissionsPerLesson = getPerUniqueValue<TeacherSubmissionDetail>(submissions, {
        getKey,
    });

    if (!Object.entries(submissionsPerLesson).length) {
        return (
            <Alert severity="info">
                {t("Keine Einsendungen verfügbar")}
            </Alert>
        );
    }

    return (
        <Grid container direction="column" spacing={2} alignItems="center" wrap="nowrap">
            {Object.entries(submissionsPerLesson).map(([key, submissions]) =>
                <SubmissionsList
                    key={key}
                    listKey={key}
                    submissions={submissions}
                />)}
        </Grid>

    );
};

export default Submissions;
