import {Culture, DateLocalizer, Formats} from "react-big-calendar";
import dayjs, {Dayjs} from "dayjs";

// Format functions

const dateRangeFormat = ({start, end}, culture, local) =>
    `${local.format(start, "L", culture)} – ${local.format(end, "L", culture)}`;

const weekRangeFormat = ({start, end}, culture, local) => {
    const startFormat = dayjs(start).isSame(end, "month") ? "DD." : "DD. MMMM";

    return `${local.format(start, startFormat, culture)} - ${local.format(end, "DD. MMMM", culture)}`;
};

const timeRangeFormat = ({start, end}, culture, local) =>
    `${local.format(start, "L", culture)} - ${local.format(end, "L", culture)}`;

// Localizer helper functions

const firstOfWeek = () => 0;

const localeInstance = (instance: Dayjs, culture?: Culture) => (culture ? instance.locale(culture) : instance);

const format = (value, format, culture: Culture) => localeInstance(dayjs(value), culture).format(format);

// Instances & objects

const formats: Formats = {
    dateFormat: "DD",
    dayFormat: "DD ddd",
    weekdayFormat: "ddd",

    timeGutterFormat: "LT",

    monthHeaderFormat: "MMMM YYYY",
    dayHeaderFormat: "ddd, ll",
    dayRangeHeaderFormat: weekRangeFormat,
    agendaHeaderFormat: dateRangeFormat,

    agendaDateFormat: "ll",
    agendaTimeFormat: "LT",
    agendaTimeRangeFormat: timeRangeFormat,

    selectRangeFormat: timeRangeFormat,
    eventTimeRangeFormat: timeRangeFormat,
};

const locale = new DateLocalizer({
    formats,
    firstOfWeek,
    format,
});

export default locale;
