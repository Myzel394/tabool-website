import React, {forwardRef} from "react";
import {Fade} from "@material-ui/core";

const FadeTransition = (props, ref) => {
    return <Fade ref={ref} {...props} />;
};

export default forwardRef(FadeTransition);
