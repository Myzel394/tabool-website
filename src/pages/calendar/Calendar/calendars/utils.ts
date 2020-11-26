import {Event as CalendarEvent} from "react-big-calendar";

const stringifyPercent = (value: string | number): string => (typeof value === "string" ? value : `${value}%`);

const getDivStyles = (style: any, event?: CalendarEvent): any => {
    const {height, top, width, xOffset} = style;

    return {
        top: stringifyPercent(top),
        left: stringifyPercent(xOffset),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        position: event?.allDay ? "" : "absolute" as "absolute",
    };
};

export default getDivStyles;
