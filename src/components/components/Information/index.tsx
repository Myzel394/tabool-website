import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Box, Typography, TypographyProps, useTheme} from "@material-ui/core";

export interface IInformation extends TypographyProps {
    getIcon: (props) => ReactNode;
    text: ReactNode;
    tooltip?: string;
}

const Information = ({getIcon, text, tooltip, style, ...other}: IInformation) => {
    const theme = useTheme();
    const iconProps = useMemo(() => ({
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body1.fontSize,
    }), [theme.palette.text.secondary, theme.typography.body1.fontSize]);
    const textNode = (
        <Typography
            style={{
                display: "inline-block",
                ...(style ?? {}),
            }}
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
            alignContent="center"
            width="fit-content"
        >
            {getIcon(iconProps)}
            {tooltipNode}
        </Box>
    );
};


export default Information;
