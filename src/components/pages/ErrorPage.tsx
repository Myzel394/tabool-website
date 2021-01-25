import React from "react";
import {Box} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export interface IErrorPage {
    description: string;
}

const ErrorPage = ({
    description,
}: IErrorPage) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{height: "100vh"}}
        >
            <Box pt={2}>
                <Alert severity="error">
                    {description}
                </Alert>
            </Box>
        </Box>
    );
};

export default ErrorPage;
