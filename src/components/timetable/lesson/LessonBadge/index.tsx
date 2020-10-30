import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {Box} from "@material-ui/core";
import styles from "./LessonBadge.module.scss";

export interface ILessonBadge {
    description: string;
    getIcon: (props) => ReactNode;
    color: string;
}

const LessonBadge = ({description, getIcon, color}: ILessonBadge) => {
    const props = useMemo(() => ({
        color
    }), [color]);

    return (
        <Tooltip title={description}>
            <Box m={2} className={styles.container}>
                {getIcon(props)}
            </Box>
        </Tooltip>
    );
}

export default LessonBadge;
