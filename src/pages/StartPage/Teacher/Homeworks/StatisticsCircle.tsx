import React from "react";
import {makeStyles, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import tinycolor from "tinycolor2";
import {Tooltip} from "components";

import Circle from "./Circle";


export interface IStatisticsCircle {
    completedAmount: number;
    ignoredAmount: number;
    participantsCount: number;
}

const useStyles = makeStyles(theme => ({
    svg: {
        transform: "rotate(-90deg)",
        width: "2.5em",
        height: "2.5em",
    },
    background: {
        stroke: tinycolor(theme.palette.text.primary).setAlpha(0.05).toString(),
        fill: "transparent",
    },
}));

const StatisticsCircle = ({
    completedAmount,
    ignoredAmount,
    participantsCount,
}: IStatisticsCircle) => {
    const {t} = useTranslation();
    const theme = useTheme();
    const classes = useStyles();

    const completedPercentage = completedAmount / participantsCount;
    const ignoredPercentage = ignoredAmount / participantsCount;

    return (
        <Tooltip
            leaveTouchDelay={3000}
            title={
                t("{{completed}} erledigt; {{ignored}} ignoriert", {
                    completed: completedAmount,
                    ignored: ignoredAmount,
                }).toString()}
        >
            <svg viewBox="0 0 120 120" className={classes.svg}>
                <circle
                    className={classes.background}
                    fill="transparent"
                    r="40"
                    cx="60"
                    cy="60"
                    strokeWidth="22"
                />
                <Circle color={theme.palette.warning.main} fillPercentage={ignoredPercentage} offsetPercentage={completedPercentage} />
                <Circle color={theme.palette.success.main} fillPercentage={completedPercentage} />
            </svg>
        </Tooltip>
    );
};

export default StatisticsCircle;
