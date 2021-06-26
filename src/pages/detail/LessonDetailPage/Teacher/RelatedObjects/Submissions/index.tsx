import React, {useContext} from "react";
import {Box, LinearProgress, List, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {TeacherSubmissionListElement} from "modules";
import {Alert} from "@material-ui/lab";

import RelatedObjectsContext from "../RelatedObjectsContext";

import ExtraOptions from "./ExtraOptions";


const Submissions = () => {
    const {t} = useTranslation();
    const {
        submissions,
        lesson,
    } = useContext(RelatedObjectsContext);
    const usersSubmissionAmount = submissions.flatMap(submission => submission.student.id).length;

    return (
        <>
            <Typography variant="h2">
                {t("Einsendungen")}
            </Typography>
            <Box my={2}>
                {submissions.length ? (
                    <>
                        <Typography variant="body1" color="textSecondary">
                            {t("{{amount}} / {{users}} Einsendungen eingereicht", {
                                amount: usersSubmissionAmount,
                                users: lesson.course.participantsCount,
                            })}
                        </Typography>
                        <Box mt={1}>
                            <LinearProgress variant="determinate" value={Math.min(100, usersSubmissionAmount / lesson.course.participantsCount * 100)} />
                        </Box>
                        <List>
                            {submissions.map(submission =>
                                <TeacherSubmissionListElement key={submission.id} submission={submission} />)}
                        </List>
                        <ExtraOptions />
                    </>
                ) : (
                    <Alert severity="info">
                        {t("Es liegen keine Einsendungen vor.")}
                    </Alert>
                )}
            </Box>
        </>
    );
};

export default Submissions;
