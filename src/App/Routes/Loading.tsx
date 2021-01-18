import React, {memo} from "react";
import {Box, CircularProgress} from "@material-ui/core";


const Loading = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    );
};

export default memo(Loading);
