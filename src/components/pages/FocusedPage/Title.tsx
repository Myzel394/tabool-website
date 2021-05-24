import React, {memo} from "react";
import {Box, Typography, useTheme} from "@material-ui/core";

export interface TitleProps {
    title: string;
}

const style = {
    wordBreak: "break-word" as "break-word",
};

const Title = ({title}: TitleProps) => {
    const theme = useTheme();

    const headerColor = {
        ...style,
        color: theme.palette.primary.main,
        fontWeight: 900,
    };

    return (
        <Box marginY={5}>
            <Typography variant="h1" style={headerColor} align="center">
                {title}
            </Typography>
        </Box>
    );
};

export default memo(Title);
