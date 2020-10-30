import React, {useContext, useMemo} from "react";
import Time from "./Time";
import styles from "./LessonContent.module.scss";
import Course from "./Course";
import Information from "./Information";
import {FaGraduationCap, FaMarker} from "react-icons/all";
import LessonContext from "../LessonContext";
import clsx from "clsx";
import {Box} from "@material-ui/core";


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
    const {color, isDisabled, startTime, endTime} = useContext(LessonContext);

    const wrapperStyle = useMemo(() => ({
        backgroundColor: color,
    }), [color]);

    return (
        <Box
            flexDirection="column"
            flexWrap="wrap"
            style={wrapperStyle}
            className={clsx(styles.container, {
                [styles.disabled]: isDisabled
            })}>
            <div className={styles.secondary}>
                <Time startTime={startTime} endTime={endTime} />
            </div>
            <Course name={courseName} />
            <div>
                <Information
                    getIcon={props => <FaGraduationCap {...props} />}
                    text={teacherName}
                />
                <Information
                    getIcon={props => <FaMarker {...props} />}
                    text={roomName}
                />
            </div>
        </Box>
    );
};

LessonContent.defaultProps = {
    isDisabled: false,
}

export default LessonContent;
