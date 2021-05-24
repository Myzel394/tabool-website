import {ReactNode} from "react";
import {useRealTimeUpdate} from "hooks";

export interface TimeRelativeProps {
    children: ((now: Date) => ReactNode) | ReactNode;
    updateFrequency: number;
}

const TimeRelative = ({children, updateFrequency}: TimeRelativeProps) => {
    const now = useRealTimeUpdate(updateFrequency);

    return typeof children === "function" ? children(now) : children;
};

TimeRelative.defaultProps = {
    updateFrequency: 10 * 1000,
};

export default TimeRelative;
