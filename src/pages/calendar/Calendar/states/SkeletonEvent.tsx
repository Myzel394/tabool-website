import React, {memo} from "react";
import {Skeleton} from "@material-ui/lab";
import {Typography} from "@material-ui/core";

import getDivStyles from "../calendars/utils";

const SkeletonEvent = ({style}: any) => {
    const divStyle = getDivStyles(style ?? {});

    return (
        <div style={divStyle}>
            <Typography variant="h4">
                <Skeleton />
            </Typography>
            <Typography variant="h1">
                <Skeleton />
            </Typography>
        </div>
    );
};

export default memo(SkeletonEvent);
