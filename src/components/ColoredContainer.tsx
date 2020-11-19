import React, {ReactNode} from "react";
import {createMuiTheme, Theme, ThemeProvider} from "@material-ui/core";
import update from "immutability-helper";
import tinycolor from "tinycolor2";

export interface IColoredContainer {
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
            text: {
                $set: isLight ? darkText : lightText,
            },
        },
    });
};

const ColoredContainer = ({children, parentTheme, color}: IColoredContainer) => {
    return (
        <ThemeProvider theme={createTheme(parentTheme, color)}>
            {children}
        </ThemeProvider>
    );
};

export default ColoredContainer;
