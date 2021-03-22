/* eslint-disable @shopify/jsx-prefer-fragment-wrappers */
import React, {useContext} from "react";
import dayjs from "dayjs";
import {isDateEqual} from "utils";
import {Zoom} from "react-reveal";
import {useTheme} from "@material-ui/core";

import TimetableContext from "../TimetableContext";
import useSelectedColor from "../hooks/useSelectedColor";

const VALID_WEEKDAYS = [1, 2, 3, 4, 5];

const MonthEvent = ({
    label,
    date,
}) => {
    const {
        selectedDate,
        onSelectedDateChange,
        calendarEvents,
    } = useContext(TimetableContext);
    const selectedColor = useSelectedColor();
    const theme = useTheme();

    const isValidWeekday = VALID_WEEKDAYS.includes(dayjs(date).day());
    const eventsForDay = calendarEvents
        .filter(event => isDateEqual(dayjs(date), dayjs(event.start)))
        .slice(0, 6);

    const updateDate = () => {
        if (!isValidWeekday) {
            return;
        }

        if (selectedDate?.isSame(date)) {
            onSelectedDateChange(null);
        } else {
            onSelectedDateChange(dayjs(date));
        }
    };

    return (
        <div
            style={{
                backgroundColor: selectedDate?.isSame(date) ? selectedColor : "",
                height: "100%",
                opacity: isValidWeekday ? 1 : 0.1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            onClick={updateDate}
            onKeyDown={event => {
                if (event.keyCode === 32) {
                    updateDate();
                }
            }}
        >
            <div>
                {label}
            </div>
            <div
                style={{
                    display: "flex",
                    flexBasis: "calc(100% / 3)",
                    flexWrap: "wrap-reverse",
                }}
            >
                {eventsForDay.map(event => {
                    const {icon: Icon} = event.resource;

                    return (
                        <Zoom
                            key={event.resource.id}
                            delay={Math.random() * 100}
                            duration={theme.transitions.duration.enteringScreen}
                        >
                            <Icon
                                size="1rem"
                                style={{padding: 1}}
                                color={theme.palette.text.hint}
                            />
                        </Zoom>
                    );
                })}
            </div>
        </div>
    );
};
export default MonthEvent;


