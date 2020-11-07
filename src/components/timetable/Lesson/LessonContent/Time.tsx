import React from "react";
import {Dayjs} from "dayjs";
import DayJSEl from "react-dayjs";
import {Typography} from "@material-ui/core";

export interface ITime {
    startTime: Dayjs;
    endTime: Dayjs;
}

export const timeFormat = "HH:mm";

const Time = ({startTime, endTime}: ITime) => {
    return (
        <Typography variant="body2" color="textSecondary">
            <DayJSEl format={timeFormat}>{startTime}</DayJSEl> -
            <DayJSEl format={timeFormat}>{endTime}</DayJSEl>
        </Typography>
    );
};

export default Time;
