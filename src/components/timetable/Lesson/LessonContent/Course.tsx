import React, {memo} from "react";
import {Typography} from "@material-ui/core";
import clsx from "clsx";

import useTextClass from "../useTextClass";
import styles from "../LessonContent.module.scss";

export interface ICourse {
    name: string;
}


const Course = ({name}: ICourse) => {
    const textClass = useTextClass();

    return (
        <Typography
            variant="h5"
            component="h1"
            className={clsx(textClass, styles.title)}
        >
            {name}
        </Typography>
    );
};

export default memo(Course);
