import React, {useContext, useMemo} from "react";
import {FaGraduationCap, FaMapMarkerAlt} from "react-icons/all";
import clsx from "clsx";
import {Box} from "@material-ui/core";

import LessonContext from "../LessonContext";

import Time from "./Time";
import styles from "./LessonContent.module.scss";
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
    const {color, isDisabled, startTime, endTime, isSingle} = useContext(LessonContext);

    const wrapperStyle = useMemo(() => ({
        backgroundColor: color,
    }), [color]);

    return (
        <article>
            <Box
                flexDirection="column"
                flexWrap="wrap"
                p={1}
                style={wrapperStyle}
                className={clsx(styles.container, {
                    [styles.disabled]: isDisabled,
                    [styles.single]: isSingle,
                })}
                {...(
                    isSingle && {
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }
                )}
            >
                <div>
                    <div className={styles.secondary}>
                        <Time startTime={startTime} endTime={endTime} />
                    </div>
                    <Box my={1}>
                        <Course name={courseName} />
                    </Box>
                </div>
                <dl
                    className={clsx({
                        [styles.singleLessonInformation]: isSingle ?? false,
                    })}
                >
                    <Information
                        getIcon={props => <FaGraduationCap {...props} />}
                        text={teacherName}
                    />
                    <Information
                        getIcon={props => <FaMapMarkerAlt {...props} />}
                        text={roomName}
                    />
                </dl>
            </Box>
        </article>
    );
};

LessonContent.defaultProps = {
    isDisabled: false,
};

export default LessonContent;
