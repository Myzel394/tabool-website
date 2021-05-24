import {cloneElement, memo} from "react";
import {useAdaptedColor} from "hooks";
import {useTheme} from "@material-ui/core";

export interface IDay {
    color: string;
    dayComponent: JSX.Element;
}

const Day = ({color, dayComponent}: IDay) => {
    const theme = useTheme();

    const [textColor, backgroundColor] = useAdaptedColor(color, theme.palette.background.paper);

    return cloneElement(dayComponent, {
        style: {
            color: textColor,
            backgroundColor,
        },
    });
};

export default memo(Day);
