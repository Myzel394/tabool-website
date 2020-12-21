import React, {ReactNode, useMemo} from "react";
import {CircularProgress, Typography, useTheme} from "@material-ui/core";
import clsx from "clsx";

import classes from "./index.module.scss";

export interface ILoadingOverlay {
    isLoading: boolean;
    children: ReactNode;

    text?: string;
    value?: number;
}

const LoadingOverlay = ({isLoading, children, text, value}: ILoadingOverlay) => {
    const theme = useTheme();
    const styles = useMemo(() => {
        return isLoading ? {
            zIndex: theme.zIndex.modal - 1,
        } : {display: "none"};
    }, [isLoading, theme.zIndex.modal]);
    const childrenStyles = useMemo(() => {
        return isLoading ? {
            opacity: 0.1,
        } : {};
    }, [isLoading]);
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
                <CircularProgress variant={value ? "determinate" : "indeterminate"} value={value} />
                {text && <Typography>{text}</Typography>}
            </div>
        </div>
    );
};

export default LoadingOverlay;
