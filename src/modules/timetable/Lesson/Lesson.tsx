import React, {ReactNode, useMemo} from "react";
import {Dayjs} from "dayjs";
import clsx from "clsx";
import {Box, useTheme} from "@material-ui/core";
import {ModificationType} from "api";
import {ColoredContainer} from "components";

import LessonContext from "./LessonContext";
import COLORS from "./colors";

export interface LessonProps {
    children: ReactNode;
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    isDisabled?: boolean;
    className?: any;
    style?: any;
}


const Lesson = ({
    children,
    startTime,
    endTime,
    color,
    isDisabled,
    className,
    style,
}: LessonProps) => {
    const theme = useTheme();
    const contextValue = useMemo(() => ({
        color,
        startTime,
        endTime,
        isDisabled: isDisabled ?? false,
    }), [color, startTime, endTime, isDisabled]);
    const themeColor = isDisabled ? COLORS[ModificationType.FreePeriod] : color;

    return (
        <Box
            height="100%"
            className={clsx(
                className,
            )}
            style={style}
        >
            <LessonContext.Provider value={contextValue}>
                <ColoredContainer
                    color={themeColor}
                    parentTheme={theme}
                >
                    {children}
                </ColoredContainer>
            </LessonContext.Provider>
        </Box>
    );
};

Lesson.defaultProps = {
    isDisabled: false,
};

export default Lesson;

