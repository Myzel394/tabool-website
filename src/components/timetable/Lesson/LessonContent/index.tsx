import React, {useContext, useMemo} from "react";
import clsx from "clsx";
import {Box, Typography, useTheme} from "@material-ui/core";
import {useDeviceWidth} from "hooks";
import {FaGraduationCap, FaMapMarkerAlt} from "react-icons/all";
import DayJSEl from "react-dayjs";

import LessonContext from "../LessonContext";
import styles from "../LessonContent.module.scss";
import Information from "../../../Information";


export interface ILessonContent {
    courseName: string;
    teacherName: string;
    roomName: string;

    className?: any;
    showDetails?: boolean;
}

const TIME_FORMAT = "LT";

const LessonContent = ({
    courseName,
    teacherName,
    roomName,
    className,
    showDetails,
}: ILessonContent) => {
    const theme = useTheme();
    const {isDisabled, startTime, endTime} = useContext(LessonContext);
    const {isMD} = useDeviceWidth();

    const wrapperStyle = useMemo(() => ({
        backgroundColor: theme.palette.primary.main,
        padding: isMD ? ".4em" : ".1em .4em",
        borderRadius: theme.shape.borderRadius,
    }), [isMD, theme.palette.primary.main, theme.shape.borderRadius]);

    return (
        <Box
            component="article"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
            display="flex"
            style={wrapperStyle}
            className={clsx(
                styles.container,
                {
                    [styles.disabled]: isDisabled,
                },
                className,
            )}
            py={Number(!isMD)}
        >
            {showDetails ? (
                <>
                    <div>
                        <div className={styles.secondary}>
                            {/* <Time> */}
                            <Typography variant="body2" color="textSecondary">
                                <DayJSEl format={TIME_FORMAT}>{startTime}</DayJSEl> -
                                <DayJSEl format={TIME_FORMAT}>{endTime}</DayJSEl>
                            </Typography>
                            {/* </Time> */}
                        </div>
                        <Box>
                            {/* <Course> */}
                            <Typography
                                variant="h5"
                                component="h1"
                                className={styles.title}
                                color="textPrimary"
                            >
                                {courseName}
                            </Typography>
                            {/* </Course> */}
                        </Box>
                    </div>
                    <Box
                        component="dl"
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        m={0}
                        className={clsx(
                            styles.information,
                        )}
                    >
                        <Information
                            getIcon={props => <FaGraduationCap {...props} />}
                            text={teacherName}
                        />
                        <Information
                            getIcon={props => <FaMapMarkerAlt {...props} />}
                            text={roomName}
                        />
                    </Box>
                </>
            ) : (
                <Typography
                    variant="h5"
                    component="h1"
                    className={styles.title}
                    color="textPrimary"
                >
                    {courseName}
                </Typography>
            )}
        </Box>
    );
};

export default LessonContent;
