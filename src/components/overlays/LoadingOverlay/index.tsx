import React, {ReactNode, useMemo} from "react";
import {CircularProgress, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";
import clsx from "clsx";

import classes from "./index.module.scss";

export interface ILoadingOverlay {
    isLoading: boolean;
    children: ReactNode;
}

const LoadingOverlay = ({isLoading, children}: ILoadingOverlay) => {
    const theme = useTheme();
    const styles = useMemo(() => {
        return isLoading ? {
            backgroundColor: tinycolor(theme.palette.background.paper).setAlpha(0.8).toString(),
            zIndex: theme.zIndex.modal - 1,
        } : {display: "none"};
    }, [isLoading, theme.palette.background.paper, theme.zIndex.modal]);
    const containerClasses = useMemo(() => clsx([
        classes.overlay,
        {
            [classes.disabled]: !isLoading,
        },
    ]), [isLoading]);

    return (
        <div className={classes.wrapper}>
            {children}
            <div className={containerClasses} style={styles}>
                <CircularProgress />
            </div>
        </div>
    );
};

export default LoadingOverlay;
