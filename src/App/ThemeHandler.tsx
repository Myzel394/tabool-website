import React, {memo} from "react";
import {ThemeProvider} from "@material-ui/core";
import light from "themes/light";
import dark from "themes/dark";
import {useUserPreferences} from "hooks";


const THEME_MAP = {
    light,
    dark,
};

const ThemeHandler = ({children}) => {
    const {state} = useUserPreferences();


    return (
        <ThemeProvider theme={THEME_MAP[state?.global?.theme ?? "light"]}>
            {children}
        </ThemeProvider>
    );
};

export default memo(ThemeHandler);
