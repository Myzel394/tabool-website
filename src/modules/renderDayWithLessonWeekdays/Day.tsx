import {cloneElement, memo} from "react";
import {useAdaptedColor} from "hooks";
import {useTheme} from "@material-ui/core";

export interface DayProps {
    color: string;
    dayComponent: JSX.Element;
    isSelected: boolean;
}

const Day = ({color, dayComponent, isSelected}: DayProps) => {
    const theme = useTheme();

    const [textColor, backgroundColor] = useAdaptedColor(color, theme.palette.background.paper);

    return cloneElement(dayComponent, {
        style: isSelected
            ? {
                color: backgroundColor,
                backgroundColor: textColor,
            } : {
                color: textColor,
                backgroundColor,
            },
    });
};

export default memo(Day);
