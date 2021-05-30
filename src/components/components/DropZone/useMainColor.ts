import tinycolor from "tinycolor2";
import {useTheme} from "@material-ui/core";

export interface UseStylesData {
    isDragActive: boolean;
}

const useMainColor = ({
    isDragActive,
}: UseStylesData) => {
    const theme = useTheme();
    return tinycolor(theme.palette.text.secondary)
        .setAlpha(isDragActive ? 1 : theme.palette.action.activatedOpacity)
        .toString();
};

export default useMainColor;
