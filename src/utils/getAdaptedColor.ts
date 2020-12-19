import tinycolor from "tinycolor2";

import {isDark, isLight} from "./color";

export interface IGetAdaptedColor {
    lightText?: string;
    darkText?: string;
    type?: "light" | "dark";
    backgroundOpacity?: number;
    textColor: string;
    backgroundColor: string;
}

const getAdaptedColor = ({
    lightText = "#fff",
    darkText = "#222",
    type = "light",
    backgroundOpacity = 0.3,
    textColor,
    backgroundColor,
}: IGetAdaptedColor): [string, string] => {
    const tinyTextColor = tinycolor(textColor);
    const tinyBackgroundColor = tinycolor(backgroundColor);
    const isColorLight = isLight(tinyTextColor);
    const isBackgroundLight = isLight(tinyBackgroundColor);
    const isColorDark = isDark(tinyTextColor);
    const isBackgroundDark = isDark(tinyBackgroundColor);

    let realTextColor = textColor;
    let realBackgroundColor = backgroundColor;

    if (type === "light") {
        if (isColorLight && isBackgroundLight) {
            realTextColor = darkText;
        } else if (isColorDark && isBackgroundDark) {
            realTextColor = lightText;
        }
    } else if (type === "dark") {
        if (isColorLight && isBackgroundLight) {
            realBackgroundColor = tinyBackgroundColor.setAlpha(backgroundOpacity).toString();
        } else if (isColorDark && isBackgroundDark) {
            realBackgroundColor = lightText;
        }
    }

    return [realTextColor, realBackgroundColor];
};

export default getAdaptedColor;
