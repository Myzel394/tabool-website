import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Typography, useTheme} from "@material-ui/core";

import styles from "./Information.module.scss";

export interface IInformation {
    getIcon: (props) => ReactNode;
    text: ReactNode;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip}: IInformation) => {
    const theme = useTheme();
    const iconProps = useMemo(() => ({
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
    }), [theme.palette.text.primary, theme.typography.body1.fontSize]);
    const textNode =
        <Typography
            className={styles.text}
            variant="body1"
            component="dd"
            color="textSecondary"
        >
            {text}
        </Typography>;
    const tooltipNode = tooltip ? <Tooltip title={tooltip}>{textNode}</Tooltip> : textNode;

    return (
        <div className={styles.container}>
            {getIcon(iconProps)}
            {tooltipNode}
        </div>
    );
};


export default Information;
