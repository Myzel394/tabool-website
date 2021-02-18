import React, {memo} from "react";
import {StudentExamDetail} from "types";
import {Exam} from "components";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Box, Link, useTheme} from "@material-ui/core";
import {Zoom} from "react-reveal";
import {buildPath} from "utils";

import createShadow from "../createShadow";


export interface IExams {
    exams: StudentExamDetail[];
}


const Exams = ({
    exams,
}: IExams) => {
    const theme = useTheme();
    const {t} = useTranslation();

    if (!exams.length) {
        return (
            <Box mb={2}>
                <Alert severity="info">
                    {t("Du hast keine Arbeiten in naher Zukunft.")}
                </Alert>
            </Box>
        );
    }

    return (
        <>
            {exams.map(exam =>
                <Zoom key={exam.id} mountOnEnter duration={theme.transitions.duration.enteringScreen}>
                    <Link
                        underline="none"
                        href={buildPath("/agenda/exam/detail/:id", {
                            id: exam.id,
                        })}
                    >
                        <Exam
                            style={{
                                boxShadow: createShadow(exam.course.subject.userRelation.color),
                            }}
                            targetedDate={exam.date}
                            course={exam.course}
                            information={exam.information}
                        />
                    </Link>
                </Zoom>)}
        </>
    );
};

export default memo(Exams);
