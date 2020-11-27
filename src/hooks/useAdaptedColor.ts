import {useTheme} from "@material-ui/core";
import tinycolor, {Instance as TinyColor} from "tinycolor2";
import {useEffect, useState} from "react";

const isLight = (value: TinyColor): boolean => value.getBrightness() / 255 > 0.8;
const isDark = (value: TinyColor): boolean => value.getBrightness() / 255 < 0.2;

const useAdaptedColor = (colorString: string): [string, string] => {
    const theme = useTheme();
    const [backgroundColor, setBackgroundColor] = useState<string>(colorString);
    const [textColor, setTextColor] = useState<string>(colorString);

    // Set colors
    useEffect(() => {
        const lightText = theme.palette.common.white;
        const darkText = theme.palette.common.black;
        const type = theme.palette.type;

        const color = tinycolor(colorString);
        const isColorLight = isLight(color);
        const isColorDark = isDark(color);

        const background = theme.palette.background.default;

        const setColors = () => {
            if (type === "light") {
                if (isColorLight) {
                    setTextColor(darkText);
                    return;
                }
            } else if (type === "dark") {
                if (isColorLight) {
                    setTextColor(darkText);
                    return;
                } else if (isColorDark) {
                    setTextColor(lightText);
                    return;
                } else {
                    setBackgroundColor(color.setAlpha(0.3).toString());
                    setTextColor(color.toString());
                    return;
                }
            }

            // Default color
            setBackgroundColor(colorString);
            setTextColor(background);
        };

        setColors();
    }, [colorString, theme.palette.background.default, theme.palette.common.black, theme.palette.common.white, theme.palette.type]);

    return [backgroundColor, textColor];
};

export default useAdaptedColor;
