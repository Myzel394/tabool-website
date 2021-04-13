import React, {useState} from "react";
import {TeacherHomeworkDetail} from "types";
import {
    CircularProgress,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {MdDeleteForever, MdMoreVert} from "react-icons/all";
import {BottomSheetAction, ButtonLike} from "components";
import {buildPath} from "utils";
import {useTranslation} from "react-i18next";

import DueDateChanger from "../DueDateChanger";

import StatisticsCircle from "./StatisticsCircle";
import useQuery from "./useQuery";


export interface IHomework {
    homework: TeacherHomeworkDetail;
}

const Homework = ({
    homework,
}: IHomework) => {
    const {t} = useTranslation();
    const {
        deleteHomework,
        isUpdateLoading,
        updateHomework,
        isDeleteLoading,
    } = useQuery({
        homework,
    });

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <StatisticsCircle
                        completedAmount={homework.completedAmount}
                        ignoredAmount={homework.ignoredAmount}
                        participantsCount={homework.lesson.course.participantsCount}
                    />
                </ListItemIcon>
                <ButtonLike
                    component="a"
                    color="inherit"
                    py={0}
                    width="100%"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    href={buildPath("/agenda/homework/detail/:id", {
                        id: homework.id,
                    })}
                >
                    <ListItemText
                        primary={homework.lesson.course.name}
                        secondary={
                            homework.dueDate && t("Fällig bis {{dueDate}}", {
                                dueDate: homework.dueDate?.format?.("LL"),
                            })}
                    />
                </ButtonLike>
                <ListItemSecondaryAction>
                    <IconButton onClick={() => setIsOpen(true)}>
                        <MdMoreVert />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <BottomSheetAction
                isOpen={isOpen}
                title={t("{{course}} am {{date}}", {
                    course: homework.lesson.course.name,
                    date: homework.lessonDate.format("LL"),
                })}
                onClose={() => setIsOpen(false)}
            >
                <DueDateChanger
                    title={t("Fälligkeitsdatum ändern")}
                    color={homework.lesson.course.subject.userRelation.color}
                    date={homework.lessonDate}
                    weekdays={homework.lesson.course.weekdays}
                    isLoading={isUpdateLoading}
                    onChange={newDate => {
                        setIsOpen(false);
                        updateHomework({
                            dueDate: newDate,
                        });
                    }}
                />

                <ListItem
                    button
                    disabled={isDeleteLoading}
                    onClick={() => {
                        setIsOpen(false);
                        deleteHomework();
                    }}
                >
                    <ListItemIcon>
                        <MdDeleteForever size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Löschen")}
                    />
                    {isDeleteLoading && <CircularProgress color="inherit" size="1rem" />}
                </ListItem>
            </BottomSheetAction>
        </>
    );
};

// TODO: Add ConfirmDialogListItem element!

export default Homework;
