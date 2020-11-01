import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Grid, Typography} from "@material-ui/core";
import clsx from "clsx";

import LessonStyles from "../../LessonContent.module.scss";
import useTextClass from "../../useTextClass";

import styles from "./Information.module.scss";

export interface IInformation {
    getIcon: (props) => ReactNode;
    text: string;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip}: IInformation) => {
    const textClass = useTextClass();
    const iconProps = useMemo(() => ({
        className: clsx([LessonStyles.text, LessonStyles.icon, textClass]),
        fontSize: "large",
    }), [textClass]);
    const textNode =
        <Typography
            className={clsx(LessonStyles.text, textClass)}
            variant="body2"
            component="span"
        >
            {text}
        </Typography>;
    const tooltipNode = tooltip ? <Tooltip title={tooltip}>{textNode}</Tooltip> : textNode;

    return (
        <Grid
            container
            spacing={1}
            direction="row"
            wrap="nowrap"
            alignItems="center"
            className={styles.container}
        >
            <Grid item>
                {getIcon(iconProps)}
            </Grid>
            <Grid item>
                <dd>
                    {tooltipNode}
                </dd>
            </Grid>
        </Grid>
    );
};


export default Information;
