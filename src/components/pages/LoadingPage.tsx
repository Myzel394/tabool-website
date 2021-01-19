import React from "react";
import {Box, CircularProgress, Typography} from "@material-ui/core";

export interface ILoadingPage {
    title: string;
}

const LoadingPage = ({
    title,
}: ILoadingPage) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{height: "100vh"}}
        >
            <CircularProgress />
            <Box pt={2}>
                <Typography variant="h5">
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default LoadingPage;
