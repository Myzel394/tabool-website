import React, {memo} from "react";
import {ExamDetail} from "types";
import {Exam, SecondaryButton} from "components";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Box, useTheme} from "@material-ui/core";
import {Zoom} from "react-reveal";
import {generatePath} from "react-router-dom";
import {MdAdd} from "react-icons/all";

import createShadow from "../createShadow";


export interface IExams {
    exams: ExamDetail[];
}


const Exams = ({
    exams,
}: IExams) => {
    const theme = useTheme();
    const {t} = useTranslation();

    if (!exams.length) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Box mb={2}>
                    <Alert severity="info">
                        {t("Du hast keine Arbeiten in naher Zukunft.")}
                    </Alert>
                </Box>
                <SecondaryButton href={generatePath("/add/exam/")} startIcon={<MdAdd />}>
                    {t("Arbeit hinzufügen")}
                </SecondaryButton>
            </Box>
        );
    }

    return (
        <>
            {exams.map(exam =>
                <Zoom key={exam.id} duration={theme.transitions.duration.enteringScreen}>
                    <Exam
                        style={{
                            boxShadow: createShadow(exam.course.subject.userRelation.color),
                        }}
                        targetedDate={exam.targetedDate}
                        course={exam.course}
                        information={exam.information}
                        room={exam.room}
                    />
                </Zoom>)}
        </>
    );
};

export default memo(Exams);
