import React from "react";
import {Dayjs} from "dayjs";
import DayJSEl from "react-dayjs";
import {Typography} from "@material-ui/core";
import styles from "./LessonContent.module.scss";

export interface ITime {
    startTime: Dayjs;
    endTime: Dayjs;
}

export const timeFormat = "HH:MM";

const Time = ({startTime, endTime}: ITime) => {

    return (
        <Typography className={styles.text} variant="body2">
            <DayJSEl format={timeFormat}>{startTime}</DayJSEl> -
            <DayJSEl format={timeFormat}>{endTime}</DayJSEl>
        </Typography>
    );
}

export default Time;
