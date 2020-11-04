import React, {memo} from "react";
import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import Toolbar from "./Toolbar";

export interface ICalendar {

}

const Calendar = (props: ICalendar) => {

    console.log("calendar");

    return (
        <BigCalendar
            localizer={momentLocalizer(moment)}
            events={[
                {
                    title: "My event",
                    allDay: true,
                    start: new Date(2018, 0, 1, 10, 0),
                    end: new Date(2018, 0, 1, 14, 0),
                },
            ]}
            step={60}
            view="week"
            views={["week"]}
            date={new Date(2018, 0, 1)}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500}}
            components={{
                toolbar: Toolbar,
            }}
        />
    );
};

export default memo(Calendar);
