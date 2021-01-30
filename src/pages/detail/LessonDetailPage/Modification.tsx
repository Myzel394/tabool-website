import React, {memo, ReactNode, useMemo} from "react";
import {LessonDetail, ModificationDetail} from "types";
import {Grid, Typography, useTheme} from "@material-ui/core";
import {formatRoom, formatSubject, formatTeacher} from "format";
import {BsArrowRight, MdPlace} from "react-icons/all";
import {SubjectIcon, TeacherIcon} from "components/icons";
import {Trans} from "react-i18next";
import {useModificationDescription} from "hooks";

import Information from "./Information";

export interface IModification {
    lesson: LessonDetail;
    modification: ModificationDetail;
}

interface Data {
    key: string;
    oldValue: string;
    newValue: string;
    icon: ReactNode;
}

const Modification = ({lesson, modification}: IModification) => {
    const theme = useTheme();
    const modificationDescription = useModificationDescription(modification.modificationType);
    const oldValueStyle = useMemo(() => ({
        opacity: theme.palette.action.disabledOpacity,
        color: theme.palette.error.main,
        textDecoration: "line-through",
    }), [theme.palette.action.disabledOpacity, theme.palette.error.main]);
    const newValueStyle = useMemo(() => ({
        color: theme.palette.success.main,
    }), [theme.palette.success.main]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newData: Data[] = [
        modification.newSubject && {
            key: "subject",
            icon: <SubjectIcon />,
            oldValue: formatSubject(lesson.course.subject),
            newValue: formatSubject(modification.newSubject),
        },
        modification.newTeacher && {
            key: "teacher",
            icon: <TeacherIcon />,
            oldValue: formatTeacher(lesson.course.teacher),
            newValue: formatTeacher(modification.newTeacher),
        },
        modification.newRoom && {
            key: "room",
            icon: <MdPlace />,
            oldValue: formatRoom(lesson.room),
            newValue: formatRoom(modification.newRoom),
        },
    ].filter(Boolean);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h6" color="textSecondary">
                    <Trans>
                        <b>Veränderungsart:</b>
                        {" "}
                        {modificationDescription}
                    </Trans>
                </Typography>
            </Grid>
            <Grid item>
                {modification.information &&
                <Information text={modification.information} />
                }
            </Grid>
            <Grid item>
                <Grid container>
                    {newData.map(({key, oldValue, newValue, icon}) =>
                        <Grid key={key} item>
                            <Typography variant="body1" color="textSecondary">
                                <Grid container spacing={1} alignItems="center">
                                    {icon}
                                    <Grid item style={oldValueStyle}>
                                        {oldValue}
                                    </Grid>
                                    <BsArrowRight />
                                    <Grid item style={newValueStyle}>
                                        {newValue}
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Grid>)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default memo(Modification);
