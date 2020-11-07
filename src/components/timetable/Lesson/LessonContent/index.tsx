import React, {memo, useContext, useMemo} from "react";
import {FaGraduationCap, FaMapMarkerAlt} from "react-icons/all";
import clsx from "clsx";
import {Box, useTheme} from "@material-ui/core";

import LessonContext from "../LessonContext";
import styles from "../LessonContent.module.scss";

import Time from "./Time";
import Course from "./Course";
import Information from "./Information";


export interface ILessonContent {
    courseName: string;
    teacherName: string;
    roomName: string;
}


const LessonContent = ({
    courseName,
    teacherName,
    roomName,
}: ILessonContent) => {
    const theme = useTheme();
    const {isDisabled, startTime, endTime, isSingle, isSmall} = useContext(LessonContext);

    const wrapperStyle = useMemo(() => ({
        backgroundColor: theme.palette.primary.main,
    }), [theme.palette.primary.main]);
    const articleClassNames = useMemo(() => clsx(styles.container, {
        [styles.disabled]: isDisabled,
    }), [isDisabled]);
    const dlClassNames = useMemo(() => clsx(styles.information, {
        [styles.singleLessonInformation]: isSingle ?? false,
    }), [isSingle]);

    return (
        <Box
            component="article"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="nowrap"
            display="flex"
            p={1}
            style={wrapperStyle}
            className={articleClassNames}
        >
            <div>
                <div className={styles.secondary}>
                    <Time startTime={startTime} endTime={endTime} />
                </div>
                <Box my={Number(!isSmall)}>
                    <Course name={courseName} />
                </Box>
            </div>
            <Box
                component="dl"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                m={0}
                className={dlClassNames}
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
    );
};

LessonContent.defaultProps = {
    isDisabled: false,
};

export default memo(LessonContent);
