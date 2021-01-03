import React, {memo, useMemo} from "react";
import {Box, Typography, useTheme} from "@material-ui/core";


export interface IBasePage {
    children?: JSX.Element;
    title: string;
}


const BasePage = ({
    children,
    title,
}: IBasePage) => {
    const theme = useTheme();

    const style = useMemo(() => ({
        color: theme.palette.error.main,
    }), [theme.palette.error.main]);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography variant="h2" component="h1" style={style}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};

export default memo(BasePage);
