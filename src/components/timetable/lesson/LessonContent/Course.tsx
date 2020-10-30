import React, {memo} from "react";
import {Typography} from "@material-ui/core";
import clsx from "clsx";

import styles from "./LessonContent.module.scss";

export interface ICourse {
    name: string;
}


const Course = ({name}: ICourse) => {
    return (
        <Typography
            variant="h4"
            component="h1"
            className={clsx(styles.text, styles.title)}
        >
            {name}
        </Typography>
    );
};

export default memo(Course);
