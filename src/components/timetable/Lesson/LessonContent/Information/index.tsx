import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Typography, useTheme} from "@material-ui/core";
import clsx from "clsx";

import LessonStyles from "../../LessonContent.module.scss";

import styles from "./Information.module.scss";

export interface IInformation {
    getIcon: (props) => ReactNode;
    text: string;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip}: IInformation) => {
    const theme = useTheme();
    const iconProps = useMemo(() => ({
        color: theme.palette.text.primary,
        className: clsx([LessonStyles.text, LessonStyles.icon]),
        fontSize: theme.typography.body1.fontSize,
    }), [theme.palette.text.primary, theme.typography.body1.fontSize]);
    const textNode =
        <Typography
            className={LessonStyles.text}
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
