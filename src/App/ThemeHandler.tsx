import React, {memo} from "react";
import {ThemeProvider} from "@material-ui/core";
import light from "themes/light";
import dark from "themes/dark";
import blue from "themes/blue";
import midnight from "themes/midnight";
import {usePreferences} from "hooks";


const THEME_MAP = {
    light,
    dark,
    blue,
    midnight,
};

const ThemeHandler = ({children}) => {
    const {state} = usePreferences();

    return (
        <ThemeProvider theme={THEME_MAP[state?.global?.theme ?? "light"]}>
            {children}
        </ThemeProvider>
    );
};

export default memo(ThemeHandler);
