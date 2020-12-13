import React, {memo, useMemo} from "react";
import {ModificationDetail} from "types";
import {useTranslation} from "react-i18next";
import {Typography, useTheme} from "@material-ui/core";
import {ColoredBox} from "components";
import COLORS from "components/timetable/Lesson/colors";
import {useModificationDescription} from "hooks";

import styles from "./Modification.module.scss";

export interface IModificationEvent {
    modification: ModificationDetail;
}

const ModificationEvent = ({modification}: IModificationEvent) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const text = useModificationDescription(modification.modificationType);
    const style = useMemo(() => ({
        height: "100%",
    }), []);

    return (
        <ColoredBox
            color={COLORS[modification.modificationType]}
            style={style}
            parentTheme={theme}
            className={styles.wrapper}
        >
            <Typography
                variant="body1"
                color="textPrimary"
            >
                {text}
            </Typography>
        </ColoredBox>
    );
};

export default memo(ModificationEvent);
