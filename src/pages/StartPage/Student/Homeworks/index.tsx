import React, {memo, useState} from "react";
import {StudentHomeworkDetail} from "types";
import {Homework, HorizontalScroll, SecondaryButton} from "components";
import {useElementSize} from "hooks";
import update from "immutability-helper";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Box} from "@material-ui/core";
import {buildPath, truncate} from "utils";
import {MdAdd} from "react-icons/all";

import createShadow from "../createShadow";

export interface IHomeworks {
    homeworks: StudentHomeworkDetail[];
    onChange: (newHomeworks: StudentHomeworkDetail[]) => any;
}

const Homeworks = ({
    homeworks,
    onChange,
}: IHomeworks) => {
    const {t} = useTranslation();

    const [wrapperRef, setWrapperRef] = useState<any>();
    const [wrapperWidth = 0] = useElementSize(wrapperRef);

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
        <div
            ref={reference => {
                if (reference) {
                    setWrapperRef(reference);
                }
            }}
        >
            <HorizontalScroll<StudentHomeworkDetail> elements={homeworks}>
                {homework =>
                    <Homework
                        style={{
                            width: width || "100%",
                            boxShadow: createShadow(homework.lesson.course.subject.userRelation.color),
                        }}
                        subject={homework.lesson.course.subject}
                        information={truncate(homework.information ?? "")}
                        id={homework.id}
                        creationDate={homework.createdAt}
                        dueDate={homework.dueDate}
                        completed={homework.userRelation.completed}
                        ignore={homework.userRelation.ignored}
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
