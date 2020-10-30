import React, {ReactNode, useContext, useMemo} from "react";
import {Tooltip} from "components";
import {Box, Typography} from "@material-ui/core";
import styles from "./LessonContent.module.scss";
import LessonContext from "../LessonContext";

export interface IInformation {
    getIcon: (props) => ReactNode;
    text: string;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip}: IInformation) => {
    const {color} = useContext(LessonContext);
    const iconProps = useMemo(() => ({
        color
    }), [color]);
    const textNode = <Typography className={styles.text} variant="body2">{text}</Typography>
    const tooltipNode = tooltip ? <Tooltip title={tooltip}>{textNode}</Tooltip> : textNode;

    return (
        <Box flexDirection="row">
            {getIcon(iconProps)}
            {tooltipNode}
        </Box>
    );
}


export default Information;
