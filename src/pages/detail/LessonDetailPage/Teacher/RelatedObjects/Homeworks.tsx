import React from "react";
import {TeacherHomeworkDetail, TeacherLessonDetail} from "types";
import {Button, makeStyles, Typography} from "@material-ui/core";
import {HorizontalScroll} from "components";
import {Homework} from "modules";
import {MdAdd} from "react-icons/all";
import {buildPath, lazyDatetime, truncate} from "utils";
import {useTranslation} from "react-i18next";
import {Dayjs} from "dayjs";


export interface HomeworksProps {
    homeworks: TeacherHomeworkDetail[];
    lesson: TeacherLessonDetail;
    date: Dayjs;
}

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        width: "100%",
        padding: "3em 0",
    },
}));

const Homeworks = ({
    homeworks,
    date,
    lesson,
}: HomeworksProps) => {
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <>
            <Typography variant="h2">
                {t("Hausaufgaben")}
            </Typography>
            <HorizontalScroll<TeacherHomeworkDetail>
                elements={homeworks}
                endElements={[
                    <Button
                        key="add_homework"
                        size="large"
                        variant="text"
                        startIcon={<MdAdd />}
                        href={buildPath("/add/homework/", undefined, {
                            next: window.location.href,
                            lessonId: lesson.id,
                            lessonDate: lazyDatetime(date, "date"),
                        })}
                        className={classes.button}
                    >
                        {t("Hausaufgabe hinzufügen")}
                    </Button>,
                ]}
            >
                {homework =>
                    <Homework
                        key={homework.id}
                        id={homework.id}
                        information={truncate(homework.information ?? "")}
                        creationDate={homework.createdAt}
                        dueDate={homework.dueDate}
                        subject={homework.lesson.course.subject}
                    />
                }
            </HorizontalScroll>
        </>
    );
};
export default Homeworks;

