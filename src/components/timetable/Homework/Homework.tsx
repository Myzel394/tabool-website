import React, {memo, useMemo} from "react";
import {Dayjs} from "dayjs";
import {Subject} from "types";
import {Box, Grid, Typography, useTheme} from "@material-ui/core";
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

export interface IHomework {
    creationDate: Dayjs;
    subject: Subject;
    information: string;

    dueDate?: Dayjs;
    completed?: boolean;
    ignore?: boolean;

    onCompletedChange?: () => any;
    onIgnoreChange?: () => any;
}

const TIME_FORMAT = "ll";
const MARGIN = 2;

const Homework = ({completed, creationDate, dueDate, ignore, information, subject, onCompletedChange, onIgnoreChange}: IHomework) => {
    const theme = useTheme();
    const [updateRelation] = useMutation(useUpdateHomeworkUserRelationAPI());
    const style = useMemo(() => ({
        borderRadius: theme.shape.borderRadius,
        filter: ignore ? "grayscale(.5)" : "",
        opacity: ignore ? 0.8 : 1,
    }), [ignore, theme.shape.borderRadius]);
    const isCompleted = !ignore && completed;

    return (
        <ColoredBox style={style} className={styles.container} color={subject.userRelation.color}>
            <Box mx={MARGIN} mt={MARGIN}>
                <Grid container direction="column" justify="space-between" spacing={4}>
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
                                <Action
                                    icon={<FaCheckCircle />}
                                    isActive={isCompleted}
                                    disabled={ignore}
                                    onClick={onCompletedChange}
                                />
                                <Action
                                    icon={<HiBan />}
                                    isActive={ignore}
                                    onClick={onIgnoreChange}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <div className={styles.animationContainer}>
                    <CSSTransition
                        in={isCompleted}
                        timeout={{
                            enter: 300,
                            exit: 200,
                        }}
                        classNames={{
                            enterActive: styles.animationEntering,
                            exitActive: styles.animateExiting,
                            enterDone: styles.animateOn,
                        }}
                    >
                        <Box color="text.primary" className={clsx(styles.checkIconContainer, styles.animateOff)}>
                            <FaCheck className={styles.checkIcon} />
                        </Box>
                    </CSSTransition>
                </div>
            </Box>
        </ColoredBox>
    );
};

Homework.defaultProps = {
    completed: false,
    ignore: false,
};

export default memo(Homework);
