import React, {memo, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Box, ButtonBase, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {usePreferences} from "hooks";

export interface IUpdatedAt {
    value: Dayjs;
    frequency: number;
}

const UpdatedAt = ({value, frequency}: IUpdatedAt) => {
    const {t} = useTranslation();
    const {
        state,
        update,
    } = usePreferences();

    const [now, setNow] = useState<Dayjs>(() => dayjs());

    const preferredView = state?.global?.updatedAtTimeView ?? "dynamic";
    const setPreferredView = view => {

        update.global.setUpdatedAtTimeView(view);
    };

    const format = (() => {
        switch (preferredView) {
            case "dynamic":
                return t("Zuletzt aktualisiert {{updatedAtRelative}}", {
                    updatedAtRelative: value.from(now.add(1, "second")),
                });
            case "static":
                return t("Zuletzt aktualisiert: {{updatedAtFormatted}}", {
                    updatedAtFormatted: `${value.format("L")}, ${value.format("LTS")}`,
                });
        }
    })();

    useEffect(() => {
        const $interval = setInterval(() => {
            setNow(dayjs());
        }, frequency);

        return () => clearInterval($interval);
    }, [frequency]);

    return (
        <ButtonBase
            onClick={() => setPreferredView(preferredView === "static" ? "dynamic" : "static")}
        >
            <Box p={1}>
                <Typography variant="body2" align="left">
                    {format}
                </Typography>
            </Box>
        </ButtonBase>
    );
};

UpdatedAt.defaultProps = {
    frequency: 1000,
};

export default memo(UpdatedAt);
