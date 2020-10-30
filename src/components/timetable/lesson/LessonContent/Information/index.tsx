import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Grid, Typography} from "@material-ui/core";
import clsx from "clsx";

import LessonStyles from "../LessonContent.module.scss";

import styles from "./Information.module.scss";

export interface IInformation {
    getIcon: (props) => ReactNode;
    text: string;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip}: IInformation) => {
    const iconProps = useMemo(() => ({
        className: clsx([LessonStyles.text, LessonStyles.icon]),
        fontSize: "large",
    }), []);
    const textNode = <Typography
        className={LessonStyles.text}
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
