import React, {memo} from "react";
import {getEventWrapperStyles} from "utils";

import PureSkeleton from "./PureSkeleton";

const SkeletonEvent = ({style}: any) => {
    const divStyle = getEventWrapperStyles(style ?? {});

    return (
        <div style={divStyle}>
            <PureSkeleton />
        </div>
    );
};

export default memo(SkeletonEvent);
