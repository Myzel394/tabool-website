import React, {ReactNode} from "react";
import {Tooltip} from "components";
import {Box, makeStyles, Typography, TypographyProps} from "@material-ui/core";

export interface IInformation extends TypographyProps {
    getIcon: (props) => ReactNode;
    text: ReactNode;
    tooltip?: string;
}

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body1.fontSize,
        marginRight: theme.spacing(1),
    },
    typography: {
        display: "inline-block",
    },
}));

const Information = ({getIcon, text, tooltip, style, ...other}: IInformation) => {
    const classes = useStyles();

    const textNode = (
        <Typography
            className={classes.typography}
            variant="body1"
            component="dd"
            color="textPrimary"
            {...other}
        >
            {text}
        </Typography>
    );
    const tooltipNode = tooltip ? <Tooltip title={tooltip}>{textNode}</Tooltip> : textNode;

    return (
        <Box
            display="flex"
            alignItems="center"
            width="fit-content"
        >
            {getIcon({
                className: classes.icon,
            })}
            {tooltipNode}
        </Box>
    );
};


export default Information;
