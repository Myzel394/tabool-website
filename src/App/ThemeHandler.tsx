import React from "react";
import {ThemeProvider} from "@material-ui/core";
import light from "themes/light";
import dark from "themes/dark";
import blue from "themes/blue";
import midnight from "themes/midnight";
import {useSelector} from "react-redux";
import {getTheme, RootState} from "state";
import useSystemTheme from "react-use-system-theme";
import {AvailableThemes} from "types";


const THEME_MAP = {
    light,
    dark,
    blue,
    midnight,
};

const ThemeHandler = ({children}) => {
    const theme = useSelector<RootState>(getTheme) as AvailableThemes;
    const systemTheme = useSystemTheme();
    const activeTheme = theme === "_system" ? systemTheme : theme;

    return (
        <ThemeProvider theme={THEME_MAP[activeTheme]}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeHandler;
