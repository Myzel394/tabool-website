import React, {ReactNode, useMemo} from "react";
import {Dayjs} from "dayjs";
import {ThemeProvider} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import tinycolor from "tinycolor2";
import update from "immutability-helper";
import {useWindowSize} from "hooks";

import LessonContext from "./LessonContext";

export interface ILesson {
    children: ReactNode;
    startTime: Dayjs;
    endTime: Dayjs;
    color: string;
    isDisabled?: boolean;
    isSingle?: boolean;
    isSmall?: boolean;
}

const lightText = {
    primary: "#fff",
    secondary: "#f0f0f0",
    hint: "#ccc",
    disabled: "#aaa",
};

const darkText = {
    primary: "#222",
    secondary: "#555",
    disabled: "#aaa",
    hint: "#888",
};

const createTheme = (
    parentTheme,
    color: string,
    isSmall: boolean,
    isWidthSmall: boolean,
): Theme => {
    const isLight = tinycolor(color).getLuminance() > 0.8;

    return update(parentTheme, {
        typography: {
            $apply: () => isSmall && {
                body1: {
                    fontSize: isWidthSmall ? ".8rem" : ".9rem",
                },
                body2: {
                    fontSize: isWidthSmall ? ".5rem" : ".7rem",
                },
                h5: {
                    fontSize: isWidthSmall ? ".8rem" : "1.3rem",
                },
            },
        },
        palette: {
            primary: {
                main: {
                    $set: color,
                },
                contrastText: {
                    $set: isLight ? "#222" : "#fff",
                },
            },
            type: {
                $set: isLight ? "dark" : "light",
            },
            text: {
                $set: isLight ? darkText : lightText,
            },
        },
    });
};


const Lesson = ({
    children,
    startTime,
    endTime,
    color,
    isDisabled,
    isSingle,
    isSmall,
}: ILesson) => {
    const [width, height] = useWindowSize();
    const contextValue = useMemo(() => ({
        color,
        startTime,
        endTime,
        isDisabled: isDisabled ?? false,
        isSingle: isSingle ?? (startTime.diff(endTime, "minute") <= 45),
        isSmall: isSmall ?? false,
    }), [color, startTime, endTime, isDisabled, isSingle, isSmall]);

    return (
        <LessonContext.Provider value={contextValue}>
            <ThemeProvider
                theme={(parentTheme: Theme) =>
                    createTheme(
                        parentTheme,
                        color,
                        isSmall ?? false,
                        (width ?? 0) < 1200,
                    )
                }
            >
                {children}
            </ThemeProvider>
        </LessonContext.Provider>
    );
};

Lesson.defaultProps = {
    isDisabled: false,
};

export default Lesson;

