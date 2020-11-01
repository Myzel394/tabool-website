import React from "react";
import {Dayjs} from "dayjs";
import DayJSEl from "react-dayjs";
import {Typography} from "@material-ui/core";

import useTextClass from "../useTextClass";

export interface ITime {
    startTime: Dayjs;
    endTime: Dayjs;
}

export const timeFormat = "HH:mm";

const Time = ({startTime, endTime}: ITime) => {
    const textClass = useTextClass();

    return (
        <Typography className={textClass} variant="body2">
            <DayJSEl format={timeFormat}>{startTime}</DayJSEl> -
            <DayJSEl format={timeFormat}>{endTime}</DayJSEl>
        </Typography>
    );
};

export default Time;
