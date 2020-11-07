import React, {ReactNode, useMemo} from "react";
import {Tooltip} from "components";
import {useTheme} from "@material-ui/core";

import styles from "./LessonBadge.module.scss";

export interface ILessonBadge {
    description: string;
    getIcon: (props) => ReactNode;
}

const LessonBadge = ({description, getIcon}: ILessonBadge) => {
    const theme = useTheme();

    const props = useMemo(() => ({
        color: theme.palette.primary.main,
        className: styles.icon,
        fontSize: "large",
    }), [theme.palette.primary.main]);
    const style = useMemo(() => ({
        backgroundColor: theme.palette.background.paper,
    }), [theme]);

    return (
        <Tooltip title={description}>
            <span
                className={styles.container}
                style={style}
            >
                {getIcon(props)}
            </span>
        </Tooltip>
    );
};

export default LessonBadge;
