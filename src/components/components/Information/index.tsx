import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Typography, TypographyProps, useTheme} from "@material-ui/core";

import styles from "./Information.module.scss";

export interface IInformation extends TypographyProps {
    getIcon: (props) => ReactNode;
    text: ReactNode;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip, ...other}: IInformation) => {
    const theme = useTheme();
    const iconProps = useMemo(() => ({
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body1.fontSize,
    }), [theme.palette.text.secondary, theme.typography.body1.fontSize]);
    const textNode =
        <Typography
            className={styles.text}
            variant="body1"
            component="dd"
            color="textPrimary"
            {...other}
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
