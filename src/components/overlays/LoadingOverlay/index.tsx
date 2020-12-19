import React, {ReactNode, useMemo} from "react";
import {CircularProgress, useTheme} from "@material-ui/core";
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
            zIndex: theme.zIndex.modal - 1,
        } : {display: "none"};
    }, [isLoading, theme.zIndex.modal]);
    const childrenStyles = useMemo(() => {
        return isLoading ? {
            opacity: theme.palette.action.disabledOpacity,
        } : {};
    }, [isLoading, theme.palette.action.disabledOpacity]);
    const containerClasses = useMemo(() => clsx([
        classes.overlay,
        {
            [classes.disabled]: !isLoading,
        },
    ]), [isLoading]);

    return (
        <div className={classes.wrapper}>
            <div style={childrenStyles}>
                {children}
            </div>
            <div className={containerClasses} style={styles}>
                <CircularProgress />
            </div>
        </div>
    );
};

export default LoadingOverlay;
