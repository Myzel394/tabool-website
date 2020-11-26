import React, {useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {HomeworkDetail, Subject} from "types";
import {Box, CircularProgress, Grid, Typography, useTheme} from "@material-ui/core";
import DayJSEl from "react-dayjs";
import {FaCheck, FaCheckCircle, FaExclamationTriangle, HiBan, HiClock} from "react-icons/all";
import {CSSTransition} from "react-transition-group";
import clsx from "clsx";
import {useMutation} from "react-query";
import {useUpdateHomeworkUserRelationAPI} from "hooks";

import ColoredBox from "../../ColoredBox";
import Information from "../../Information";

import styles from "./Homework.module.scss";
import Action from "./Action";
import checkIconAnimation from "./checkIconAnimation.module.scss";
import ignoreAnimation from "./ignoreAnimation.module.scss";

export interface IHomework {
    id: string;
    creationDate: Dayjs;
    subject: Subject;
    information: string;
    onServerUpdate: (homework: HomeworkDetail["userRelation"]) => any;

    onCompletedChange: () => boolean;
    onIgnoreChange: () => boolean;

    dueDate?: Dayjs;
    completed?: boolean;
    ignore?: boolean;
}

const TIME_FORMAT = "ll";
const MARGIN = 2;

const Homework = ({
    id,
    completed,
    creationDate,
    dueDate,
    ignore,
    information,
    subject,
    onCompletedChange,
    onIgnoreChange,
    onServerUpdate,
}: IHomework) => {
    const theme = useTheme();
    const [loading, setLoading] = useState<boolean>(false);
    const [_updateRelationRaw] = useMutation(useUpdateHomeworkUserRelationAPI(), {
        onSuccess: (data, variables) => {
            setLoading(false);
            onServerUpdate(data);
        },
    });
    const style = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
        filter: ignore ? "grayscale(.5)" : "",
        opacity: ignore ? 0.8 : 1,
    }), [ignore, theme.shape.borderRadius]);
    const isCompleted = !ignore && completed;
    const updateRelation = (...data) => {
        setLoading(true);
        _updateRelationRaw(...data);
    };

    return (
        <ColoredBox
            style={style} className={styles.wrapper} color={subject.userRelation.color}
        >
            <Box mx={MARGIN} mt={MARGIN}>
                <CSSTransition
                    in={ignore}
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
                            ignore ? ignoreAnimation.animateOn : ignoreAnimation.animateOff,
                        )}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            spacing={4}
                        >
                            <Grid item>
                                <Grid container spacing={1} direction="column">
                                    <Grid item>
                                        <Typography
                                            variant="h4"
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
                                <Box flexDirection="row" display="flex" alignItems="flex-end" justifyContent="space-between">
                                    <Box display="flex" flexDirection="column">
                                        {dueDate && (
                                            <Information
                                                getIcon={props => <FaExclamationTriangle {...props} />}
                                                text={(
                                                    <DayJSEl format={TIME_FORMAT}>
                                                        {dueDate}
                                                    </DayJSEl>
                                                )}
                                            />
                                        )}
                                        <Information
                                            getIcon={props => <HiClock {...props} />}
                                            text={(
                                                <DayJSEl format={TIME_FORMAT}>
                                                    {creationDate}
                                                </DayJSEl>
                                            )}
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="row">
                                        {loading && <CircularProgress color="secondary" />}
                                        <Action
                                            icon={<FaCheckCircle />}
                                            isActive={isCompleted}
                                            disabled={ignore}
                                            onClick={() => {
                                                if (onCompletedChange()) {
                                                    updateRelation({
                                                        id,
                                                        completed: !completed,
                                                    });
                                                }
                                            }}
                                        />
                                        <Action
                                            icon={<HiBan />}
                                            isActive={ignore}
                                            onClick={() => {
                                                if (onIgnoreChange()) {
                                                    updateRelation({
                                                        id,
                                                        ignore: !ignore,
                                                    });
                                                }
                                            }}
                                        />
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
        </ColoredBox>
    );
};

Homework.defaultProps = {
    completed: false,
    ignore: false,
    onIgnoreChange: () => true,
    onCompletedChange: () => true,
    beforeMutating: () => null,
};

export default Homework;
