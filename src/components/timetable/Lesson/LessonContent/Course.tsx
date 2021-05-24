import React, {memo} from "react";
import {Typography} from "@material-ui/core";

import styles from "../LessonContent.module.css";

export interface CourseProps {
    name: string;
}

// TODO: Seriously


const Course = ({name}: CourseProps) => {
    return (
        <Typography
            variant="h5"
            component="h1"
            className={styles.title}
            color="textPrimary"
        >
            {name}
        </Typography>
    );
};

export default memo(Course);
