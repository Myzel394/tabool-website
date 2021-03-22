import React, {useContext, useMemo} from "react";
import {Calendar as BigCalendar, Components} from "react-big-calendar";
import {locale} from "utils";
import {useDeviceWidth, useWindowSize} from "hooks";
import {UtilsContext} from "contexts";
import dayjs from "dayjs";
import {withStyles} from "@material-ui/core";
import {calendarStyles} from "components";

import TimetableContext, {ITimetableContext} from "../TimetableContext";

import Toolbar from "./Toolbar";
import MonthEvent from "./MonthEvent";
import DayEvent from "./DayEvent";
import WeekEvent from "./WeekEvent";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const viewEventMap: Record<ITimetableContext["view"], any> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    work_week: WeekEvent,
    day: DayEvent,
};

const MIN_HEIGHT_FOR_DETAILS = 900;

const Calendar = ({classes}) => {
    const {
        minTime,
        maxTime,
        view,
        date,
        onDateChange,
        calendarEvents,
    } = useContext(TimetableContext);
    const {
        bottomSheetHeight = 0,
    } = useContext(UtilsContext);
    const {isMD} = useDeviceWidth();

    const [, height] = useWindowSize();
    const style = useMemo(() => ({
        width: "100%",
        height: (() => {
            const availableHeight = height - bottomSheetHeight;

            switch (view) {
                case "month":
                    // Also ensures a max height of 1200, because everything above would look strange
                    return Math.min(1200, Math.max(500, availableHeight));
                case "work_week": {
                    const minWidth = isMD ? MIN_HEIGHT_FOR_DETAILS : 700;
                    return Math.max(minWidth, availableHeight);
                }
                case "day":
                    return Math.max(MIN_HEIGHT_FOR_DETAILS, height);
            }
        })(),
    }), [height, bottomSheetHeight, view, isMD]);

    const components: Components = {
        toolbar: Toolbar,
        eventWrapper: viewEventMap[view],
        month: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dateHeader: MonthEvent,
        },
    };

    return (
        <BigCalendar
            events={calendarEvents}
            min={minTime}
            max={maxTime}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            components={components}
            style={style}
            className={classes.root}
            views={["work_week", "day", "month"]}
            view={view}
            step={30}
            date={date.toDate()}
            localizer={locale}
            onNavigate={async newDateAsDate => {
                const newDate = dayjs(newDateAsDate);

                switch (view) {
                    case "work_week":
                    case "month":
                        onDateChange(newDate);
                        break;
                    case "day":
                        switch (newDate.day()) {
                            case 0:
                                onDateChange(newDate.subtract(2, "day"));
                                break;
                            case 6:
                                onDateChange(newDate.add(2, "day"));
                                break;
                            default:
                                onDateChange(newDate);
                                break;
                        }
                        break;
                }
            }}
        />
    );
};

export default withStyles(calendarStyles)(Calendar);
