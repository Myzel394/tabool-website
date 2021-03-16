import {Event as CalendarEvent} from "react-big-calendar";

export const stringifyPercent = (value: string | number): string => (typeof value === "string" ? value : `${value}%`);

const getEventWrapperStyles = (style: any, event?: CalendarEvent): any => {
    const {height, top, width, xOffset} = style;

    return {
        top: stringifyPercent(top),
        left: stringifyPercent(xOffset),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        position: event?.allDay ? "relative" : "absolute" as "absolute",
    };
};

export default getEventWrapperStyles;
