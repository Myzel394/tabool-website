import {useMemo} from "react";
import tinycolor from "tinycolor2";
import {useTheme} from "@material-ui/core";

export interface ISelectedColor {
    backgroundColor: string;
}

const useSelectedColors = () => {
    const theme = useTheme();

    const backgroundColor = useMemo(() => {
        const {palette} = theme;
        const opacity = palette.action.activatedOpacity;
        const mainColor = palette.getContrastText(palette.background.default);
        const color = tinycolor(mainColor).setAlpha(opacity);

        return color.toString();
    }, [theme]);

    return {
        backgroundColor,
    };
};

export default useSelectedColors;
