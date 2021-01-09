import React, {useContext, useMemo} from "react";
import clsx from "clsx";
import {Box, Typography, useTheme} from "@material-ui/core";
import {useDeviceWidth} from "hooks";
import {FaGraduationCap, FaMapMarkerAlt} from "react-icons/all";
import {isMobile} from "react-device-detect";

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
        padding: isMD ? ".4em" : ".1em",
        borderRadius: theme.shape.borderRadius,
    }), [isMD, theme.palette.primary.main, theme.shape.borderRadius]);

    return (
        <Box
            component="article"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap={isMobile ? "no-wrap" : "wrap"}
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
                <Box p={1} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <section>
                        <div className={styles.secondary}>
                            {/* <Time> */}
                            <Typography variant="body2" color="textSecondary">
                                {startTime.format(TIME_FORMAT)} - {endTime.format(TIME_FORMAT)}
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
                    </section>
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
                </Box>
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
