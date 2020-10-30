import React, {memo} from "react";
import {Typography} from "@material-ui/core";
import styles from "./LessonContent.module.scss";

export interface ICourse {
    name: string;
}


const Course = ({name}: ICourse) => {
    return (
        <Typography className={styles.secondary}>
            {name}
        </Typography>
    );
}

export default memo(Course);
