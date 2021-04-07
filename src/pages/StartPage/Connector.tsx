import React from "react";
import {Box, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";


const Connector = () => {
    const theme = useTheme();
    const color = tinycolor(theme.palette.text.hint).setAlpha(theme.palette.action.focusOpacity).toString();
    const style = {
        backgroundColor: color,
        height: 20,
        width: 2,
        marginLeft: 19,
    };

    return (
        <Box my={1} style={style} />
    );
};

export default Connector;
