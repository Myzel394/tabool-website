import {CSSProperties, useContext} from "react";
import {useTheme} from "@material-ui/core";
import {UtilsContext} from "contexts";

const useSpeedDialStyle = () => {
    const theme = useTheme();
    const {
        bottomSheetHeight,
    } = useContext(UtilsContext);

    const speedDialStyle: CSSProperties = {
        position: "fixed",
        bottom: `calc(${theme.spacing(2)}px + ${bottomSheetHeight}px)`,
        right: theme.spacing(2),
        zIndex: theme.zIndex.speedDial,
    };

    return speedDialStyle;
};

export default useSpeedDialStyle;
