import {Theme} from "@material-ui/core";
import tinycolor from "tinycolor2";

const calendarStyles = (theme: Theme) => {
    const color = tinycolor(theme.palette.text.primary).setAlpha(0.1).toString();

    return {
        root: {
            "& .rbc-timeslot-group": {
                borderColor: color,
            },
            "& .rbc-time-content": {
                borderColor: color,
            },
            "& .rbc-time-view": {
                borderColor: color,
            },
            "& .rbc-events-container": {
                borderColor: color,
                margin: 0,
            },
            "& .rbc-time-header-content": {
                borderColor: color,
            },
            "& .rbc-header": {
                borderColor: `${color}!important`,
            },
            "& .rbc-day-bg": {
                borderColor: `${color}!important`,
            },
            "& .rbc-month-row": {
                borderColor: `${color}!important`,
            },
            "& .rbc-month-view": {
                borderColor: `${color}!important`,
            },
            "& .rbc-time-slot": {
                border: "none !important",
            },
            "& .rbc-today": {
                backgroundColor: theme.palette.background.default,
            },
            "& .rbc-off-range-bg": {
                backgroundColor: theme.palette.background.default,
                opacity: theme.palette.action.disabledOpacity,
            },
            "& .rbc-overlay": {
                backgroundColor: theme.palette.background.paper,
            },
            "& .rbc-show-more": {
                display: "none",
            },
        },
    };
};

export default calendarStyles;
