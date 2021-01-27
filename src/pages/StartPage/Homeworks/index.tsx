import React, {memo, useRef} from "react";
import {HomeworkDetail} from "types";
import {Homework, HorizontalScroll, SecondaryButton} from "components";
import {useElementSize} from "hooks";
import update from "immutability-helper";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Box} from "@material-ui/core";
import {buildPath} from "utils";
import {MdAdd} from "react-icons/all";

import createShadow from "../createShadow";

export interface IHomeworks {
    homeworks: HomeworkDetail[];
    onChange: (newHomeworks: HomeworkDetail[]) => any;
}

const Homeworks = ({
    homeworks,
    onChange,
}: IHomeworks) => {
    const {t} = useTranslation();

    const $wrapper = useRef<any>();
    const [wrapperWidth = 0] = useElementSize($wrapper);

    const width = Math.max(200, wrapperWidth * 0.9);

    if (!homeworks.length) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Box mb={2}>
                    <Alert severity="info">
                        {t("Du hast keine Hausaufgaben auf!")}
                    </Alert>
                </Box>
                <SecondaryButton href={buildPath("/add/homework/")} startIcon={<MdAdd />}>
                    {t("Hausaufgabe hinzufügen")}
                </SecondaryButton>
            </Box>
        );
    }

    return (
        <div ref={$wrapper}>
            <HorizontalScroll<HomeworkDetail> elements={homeworks}>
                {homework =>
                    <Homework
                        style={{
                            width: width || "100%",
                            boxShadow: createShadow(homework.lesson.lessonData.course.subject.userRelation.color),
                        }}
                        subject={homework.lesson.lessonData.course.subject}
                        information={homework.truncatedInformation}
                        id={homework.id}
                        creationDate={homework.createdAt}
                        dueDate={homework.dueDate}
                        completed={homework.userRelation.completed}
                        ignore={homework.userRelation.ignore}
                        onServerUpdate={newHomeworkRelation => {
                            const index = homeworks.findIndex(element => element.id === homework.id);
                            const newHomeworks = update(homeworks, {
                                [index]: {
                                    userRelation: {
                                        $set: newHomeworkRelation,
                                    },
                                },
                            });

                            onChange(newHomeworks);
                        }}
                    />
                }
            </HorizontalScroll>
        </div>
    );
};

export default memo(Homeworks);
