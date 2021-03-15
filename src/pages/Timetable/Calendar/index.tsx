import React, {useContext, useMemo} from "react";
import {Calendar as BigCalendar, Components} from "react-big-calendar";
import {locale} from "utils";
import {useWindowSize} from "hooks";
import {UtilsContext} from "contexts";
import dayjs from "dayjs";
import {withStyles} from "@material-ui/core";
import {calendarStyles} from "components";

import TimetableContext from "../TimetableContext";

import Toolbar from "./Toolbar";
import MonthEvent from "./MonthEvent";

const Calendar = ({classes}) => {
    const {
        view,
        date,
        onDateChange,
    } = useContext(TimetableContext);
    const {
        bottomSheetHeight,
    } = useContext(UtilsContext);

    const [, height] = useWindowSize();
    const style = useMemo(() => ({
        width: "100%",
        height: Math.min(800, Math.max(500, height - (bottomSheetHeight ?? 0))),
    }), [height, bottomSheetHeight]);

    const components: Components = {
        toolbar: Toolbar,
        month: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dateHeader: MonthEvent,
        },
    };

    return (
        <BigCalendar
            events={[]}
            components={components}
            style={style}
            className={classes.root}
            views={["work_week", "day", "month"]}
            view={view}
            step={30}
            date={date.toDate()}
            localizer={locale}
            onNavigate={newDate => onDateChange(dayjs(newDate))}
        />
    );
};

export default withStyles(calendarStyles)(Calendar);
