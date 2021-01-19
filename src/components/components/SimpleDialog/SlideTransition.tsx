import React, {forwardRef} from "react";
import {Slide} from "@material-ui/core";

const SlideTransition = (props, ref) => {
    return <Slide ref={ref} direction="up" {...props} />;
};

export default forwardRef(SlideTransition);
