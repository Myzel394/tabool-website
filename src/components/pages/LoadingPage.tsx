import React, {useEffect} from "react";
import {Box, CircularProgress, Typography} from "@material-ui/core";

export interface LoadingPageProps {
    title: string;
    setDocumentTitle?: boolean;
}

const LoadingPage = ({
    title,
    setDocumentTitle,
}: LoadingPageProps) => {
    useEffect(() => {
        if (setDocumentTitle) {
            document.title = title;
        }
    }, [setDocumentTitle, title]);

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

LoadingPage.defaultProps = {
    setDocumentTitle: true,
};

export default LoadingPage;
