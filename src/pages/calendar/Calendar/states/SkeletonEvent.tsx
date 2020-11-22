import React, {memo} from "react";

import getDivStyles from "../calendars/utils";

import PureSkeleton from "./PureSkeleton";

const SkeletonEvent = ({style}: any) => {
    const divStyle = getDivStyles(style ?? {});

    return (
        <div style={divStyle}>
            <PureSkeleton />
        </div>
    );
};

export default memo(SkeletonEvent);
