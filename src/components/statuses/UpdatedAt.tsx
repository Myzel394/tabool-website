import React, {memo, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Box, ButtonBase, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {usePersistentStorage} from "hooks";

export interface IUpdatedAt {
    value: Dayjs;
    frequency: number;
}

const UpdatedAt = ({value, frequency}: IUpdatedAt) => {
    const {t} = useTranslation();
    const [prefersStatic, setPrefersStatic] = usePersistentStorage<boolean>(false, "display:time:preferredView");
    const [now, setNow] = useState<Dayjs>(() => dayjs());
    const format = prefersStatic ? t("Zuletzt aktualisiert: {{updatedAtFormatted}}", {
        updatedAtFormatted: `${value.format("L")}, ${value.format("LTS")}`,
    }) : t("Zuletzt aktualisiert {{updatedAtRelative}}", {
        updatedAtRelative: value.from(now.add(1, "second")),
    });

    useEffect(() => {
        const $interval = setInterval(() => {
            setNow(dayjs());
        }, frequency);

        return () => clearInterval($interval);
    }, [frequency]);

    return (
        <ButtonBase
            onClick={() => setPrefersStatic(prevState => !prevState)}
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
