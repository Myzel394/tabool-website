import React, {CSSProperties, useMemo} from "react";
import {Dayjs} from "dayjs";
import {StudentHomeworkDetail, Subject} from "types";
import {Box, CircularProgress, Grid, Link, Typography, useTheme} from "@material-ui/core";
import {FaCheck, FaCheckCircle, FaExclamationTriangle, HiBan, HiClock} from "react-icons/all";
import {CSSTransition} from "react-transition-group";
import clsx from "clsx";
import {useMutation} from "react-query";
import {ColoredBox, Information} from "components";
import {AxiosError} from "axios";
import {
    IUpdateHomeworkUserRelationData,
    IUpdateHomeworkUserRelationResponse,
    useUpdateHomeworkUserRelationAPI,
} from "hooks/apis";
import {buildPath} from "utils";

import Action from "./Action";
import checkIconAnimation from "./checkIconAnimation.module.css";
import ignoreAnimation from "./ignoreAnimation.module.css";


export interface IHomework {
    id: string;
    creationDate: Dayjs;
    subject: Subject;
    information: string;

    onCompletedChange: () => boolean;
    onIgnoreChange: () => boolean;

    onServerUpdate?: (homeworkRelation: StudentHomeworkDetail["userRelation"]) => any;
    dueDate?: Dayjs | null;
    completed?: boolean;
    ignored?: boolean;
    style?: CSSProperties;
}

const TIME_FORMAT = "ll";

const Homework = ({
    id,
    completed,
    creationDate,
    dueDate,
    ignored,
    information,
    subject,
    onCompletedChange,
    onIgnoreChange,
    onServerUpdate,
    style: givenStyle,
}: IHomework) => {
    const theme = useTheme();
    const updateHomeworkRelation = useUpdateHomeworkUserRelationAPI();

    const {
        mutate: updateRelation,
        isLoading,
    } = useMutation<IUpdateHomeworkUserRelationResponse, AxiosError, IUpdateHomeworkUserRelationData>(
        (values) => updateHomeworkRelation(id, values),
        {
            onSuccess: data => onServerUpdate?.(data),
        },
    );
    const style = useMemo(() => ({
        ...givenStyle,
        position: "relative" as "relative",
        borderRadius: theme.shape.borderRadius,
        filter: ignored ? "grayscale(.5)" : "",
        opacity: ignored ? 0.8 : 1,
    }), [ignored, theme.shape.borderRadius, givenStyle]);
    const isCompleted = !ignored && completed;

    return (
        <ColoredBox
            style={style}
            color={subject.userRelation.color}
        >
            <Link
                href={buildPath("/agenda/homework/detail/:id/", {
                    id,
                })}
            >
                <Box m={2}>
                    <CSSTransition
                        in={ignored}
                        timeout={{
                            enter: 100,
                            exit: 100,
                        }}
                        classNames={{
                            enterActive: ignoreAnimation.animateEntering,
                            exitActive: ignoreAnimation.animateExiting,
                            enterDone: ignoreAnimation.animateOn,
                            exitDone: ignoreAnimation.animateOff,
                        }}
                    >
                        <div
                            className={clsx(
                                ignoreAnimation.container,
                                ignored ? ignoreAnimation.animateOn : ignoreAnimation.animateOff,
                            )}
                        >
                            <Grid
                                container
                                direction="column"
                                justify="space-between"
                                spacing={2}
                            >
                                <Grid item>
                                    <Grid container spacing={1} direction="column">
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="h1"
                                                color="textPrimary"
                                            >
                                                <Box fontWeight={900}>
                                                    {subject.name}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" color="textPrimary">
                                                {information}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Box
                                        flexDirection="row"
                                        display="flex"
                                        alignItems="flex-end"
                                        justifyContent="space-between"
                                    >
                                        <Box display="flex" flexDirection="column">
                                            {dueDate && (
                                                <Information
                                                    getIcon={props => <FaExclamationTriangle {...props} />}
                                                    text={dueDate.format(TIME_FORMAT)}
                                                />
                                            )}
                                            <Information
                                                getIcon={props => <HiClock {...props} />}
                                                text={creationDate.format(TIME_FORMAT)}
                                            />
                                        </Box>
                                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                                            <Box display="flex" flexDirection="row">
                                                {isLoading && <CircularProgress color="secondary" />}
                                                {completed === undefined ? null : (
                                                    <Action
                                                        icon={<FaCheckCircle />}
                                                        isActive={isCompleted}
                                                        disabled={ignored}
                                                        onClick={event => {
                                                            event.preventDefault();
                                                            if (onCompletedChange()) {
                                                                updateRelation({
                                                                    completed: !completed,
                                                                });
                                                            }
                                                        }}
                                                    />
                                                )}
                                                {ignored === undefined ? null : (
                                                    <Action
                                                        icon={<HiBan />}
                                                        isActive={ignored}
                                                        onClick={event => {
                                                            event.preventDefault();
                                                            if (onIgnoreChange()) {
                                                                updateRelation({
                                                                    ignored: !ignored,
                                                                });
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={isCompleted}
                        timeout={{
                            enter: 300,
                            exit: 200,
                        }}
                        classNames={{
                            enterActive: checkIconAnimation.animationEntering,
                            exitActive: checkIconAnimation.animateExiting,
                            enterDone: checkIconAnimation.animateOn,
                            exitDone: checkIconAnimation.animateOff,
                        }}
                    >
                        <Box
                            color="text.primary"
                            className={clsx(
                                checkIconAnimation.checkIconContainer,
                                isCompleted ? checkIconAnimation.animateOn : checkIconAnimation.animateOff,
                            )}
                        >
                            <FaCheck className={checkIconAnimation.checkIcon} />
                        </Box>
                    </CSSTransition>
                </Box>
            </Link>
        </ColoredBox>
    );
};

Homework.defaultProps = {
    onIgnoreChange: () => true,
    onCompletedChange: () => true,
    beforeMutating: () => null,
};

export default Homework;
