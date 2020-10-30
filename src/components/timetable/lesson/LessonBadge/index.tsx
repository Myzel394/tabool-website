import React, {ReactNode, useContext, useMemo} from "react";
import {Tooltip} from "components";
import {useTheme} from "@material-ui/core";

import LessonContext from "../LessonContext";

import styles from "./LessonBadge.module.scss";

export interface ILessonBadge {
    description: string;
    getIcon: (props) => ReactNode;
}

const LessonBadge = ({description, getIcon}: ILessonBadge) => {
    const theme = useTheme();

    const {color} = useContext(LessonContext);
    const props = useMemo(() => ({
        color,
        className: styles.icon,
        fontSize: "large",
    }), [color]);
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
