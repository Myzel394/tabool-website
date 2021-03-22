import {useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";


const useSelectedColor = (): string => {
    const theme = useTheme();

    const selectedColor = tinycolor(theme.palette.text.primary)
        .setAlpha(0.1)
        .toString();

    return selectedColor;
};

export default useSelectedColor;
