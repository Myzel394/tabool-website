import {useTheme} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getAdaptedColor} from "utils";

const useAdaptedColor = (colorString: string, backgroundColorString?: string): [string, string] => {
    const theme = useTheme();
    const [backgroundColor, setBackgroundColor] = useState<string>(colorString);
    const [textColor, setTextColor] = useState<string>(colorString);

    // Set colors
    useEffect(() => {
        const [newTextColor, newBackgroundColor] = getAdaptedColor({
            backgroundColor: backgroundColorString ?? theme.palette.background.default,
            textColor: colorString,
            type: theme.palette.type,
            lightText: theme.palette.common.white,
            darkText: theme.palette.common.black,
        });
        setTextColor(newTextColor);
        setBackgroundColor(newBackgroundColor);
    }, [colorString, backgroundColorString, theme.palette.background.default, theme.palette.common.black, theme.palette.common.white, theme.palette.type]);

    return [textColor, backgroundColor];
};

export default useAdaptedColor;
