import React, {memo} from "react";
import {Box, Typography, useTheme} from "@material-ui/core";

export interface ITitle {
    title: string;
}

const style = {
    wordBreak: "break-all" as "break-all",
};

const Title = ({title}: ITitle) => {
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
