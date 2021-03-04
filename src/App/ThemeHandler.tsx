import React from "react";
import {ThemeProvider} from "@material-ui/core";
import light from "themes/light";
import dark from "themes/dark";
import blue from "themes/blue";
import midnight from "themes/midnight";
import {useSelector} from "react-redux";
import {AvailableThemes, getTheme, RootState} from "state";


const THEME_MAP = {
    light,
    dark,
    blue,
    midnight,
};

const ThemeHandler = ({children}) => {
    const theme = useSelector<RootState>(getTheme) as AvailableThemes;

    return (
        <ThemeProvider theme={THEME_MAP[theme]}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeHandler;
