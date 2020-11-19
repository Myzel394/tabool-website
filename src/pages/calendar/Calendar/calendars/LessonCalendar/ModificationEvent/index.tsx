import React, {memo, useMemo} from "react";
import {ModificationDetail, ModificationType} from "types";
import {useTranslation} from "react-i18next";
import {Typography, useTheme} from "@material-ui/core";
import {ColoredBox} from "components";
import COLORS from "components/timetable/Lesson/colors";

import styles from "./Modification.module.scss";

export interface IModificationEvent {
    modification: ModificationDetail;
}

const ModificationEvent = ({modification}: IModificationEvent) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const text = useMemo(() => {
        switch (modification.modificationType) {
            case ModificationType.FreePeriod:
                return t("Freistunde");
            case ModificationType.Replacement:
                return t("Vertretung");
            case ModificationType.RoomChange:
                return t("Raumänderung");
            case ModificationType.SelfLearn:
                return t("Selbstorganisiertes Lernen");
        }
    }, [modification.modificationType, t]);
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
