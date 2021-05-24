import React, {ReactNode, useMemo} from "react";
import {CircularProgress, Typography, useTheme} from "@material-ui/core";
import clsx from "clsx";

import classes from "./index.module.css";

export interface LoadingOverlayProps {
    isLoading: boolean;
    children: ReactNode;

    text?: string;
    value?: number;
}

const LoadingOverlay = ({isLoading, children, text, value}: LoadingOverlayProps) => {
    const theme = useTheme();
    const styles = useMemo(() => {
        return isLoading ? {
            zIndex: theme.zIndex.modal - 1,
        } : {display: "none"};
    }, [isLoading, theme.zIndex.modal]);
    const childrenStyles = useMemo(() => {
        return isLoading ? {
            opacity: theme.palette.action.disabledOpacity,
            filter: "blur(.15rem)",
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
            <div style={childrenStyles} className={classes.children}>
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
