import React, {ReactNode} from "react";
import {createMuiTheme, Theme, ThemeProvider} from "@material-ui/core";
import update from "immutability-helper";
import tinycolor from "tinycolor2";

export interface ColoredContainerProps {
    color: string;
    children: ReactNode;

    parentTheme?: Theme;
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

const createTheme = (parentTheme: Theme | undefined, color: string): Theme => {
    const overwriteTheme: Theme = parentTheme ?? createMuiTheme();
    const isLight = tinycolor(color).getLuminance() > 0.8;

    return update(overwriteTheme, {
        palette: {
            primary: {
                main: {
                    $set: color,
                },
                contrastText: {
                    $set: isLight ? "#222" : "#fff",
                },
            },
            secondary: {
                main: {
                    $set: isLight ? "#222" : "#fff",
                },
            },
            text: {
                $set: isLight ? darkText : lightText,
            },
            action: {
                active: {
                    $set: isLight ? "rgba(0, 0, 0, 0.54)" : "#fff",
                },
                hover: {
                    $set: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
                },
                hoverOpacity: {
                    $set: isLight ? 0.04 : 0.08,
                },
                selected: {
                    $set: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.16)",
                },
                selectedOpacity: {
                    $set: isLight ? 0.08 : 0.16,
                },
                disabled: {
                    $set: isLight ? "rgba(0, 0, 0, 0.26)" : "rgba(255, 255, 255, 0.3)",
                },
                disabledBackground: {
                    $set: isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
                },
                focus: {
                    $set: isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
                },
                activatedOpacity: {
                    $set: isLight ? 0.12 : 0.24,
                },
            },
        },
    });
};

const ColoredContainer = ({children, parentTheme, color}: ColoredContainerProps) => {
    return (
        <ThemeProvider theme={createTheme(parentTheme, color)}>
            {children}
        </ThemeProvider>
    );
};

export default ColoredContainer;
