import React from "react";
import {Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const PureSkeleton = () => {
    return (
        <>
            <Typography variant="h6">
                <Skeleton />
            </Typography>
            <Typography variant="h4">
                <Skeleton />
            </Typography>
        </>
    );
};

export default PureSkeleton;
