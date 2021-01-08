import React from "react";
import {Box, Typography} from "@material-ui/core";


export interface IContent {
    children: JSX.Element;
    title: string;
}


const Content = ({
    children,
    title,
}: IContent) => {
    return (
        <Box my={1} ml={3}>
            <Box my={1}>
                <Typography variant="h4" component="h2">
                    {title}
                </Typography>
            </Box>
            <Box ml={1}>
                {children}
            </Box>
        </Box>
    );
};

export default Content;
