import {ReactNode, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";

// TODO: Make function!

export interface TimeRelativeProps {
    children: ((now: Dayjs) => ReactNode) | ReactNode;
    updateFrequency: number;
}

const TimeRelative = ({children, updateFrequency}: TimeRelativeProps) => {
    const [now, setNow] = useState<Dayjs>(dayjs());

    useEffect(() => {
        const $interval = setInterval(() => {
            setNow(dayjs());
        }, updateFrequency);

        return () => clearInterval($interval);
    }, [updateFrequency]);

    return typeof children === "function" ? children(now) : children;
};

TimeRelative.defaultProps = {
    updateFrequency: 10 * 1000,
};

export default TimeRelative;
