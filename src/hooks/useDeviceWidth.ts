import {useTheme} from "@material-ui/core";

import useWindowSize from "./useWindowSize";

const useDeviceWidth = () => {
    const theme = useTheme();
    const [width, x] = useWindowSize();
    const {lg, md, sm, xl, xs} = theme.breakpoints.values;

    return {
        isXS: width >= xs,
        isSM: width >= sm,
        isMD: width >= md,
        isLG: width >= lg,
        isXL: width >= xl,
    };
};

export default useDeviceWidth;
