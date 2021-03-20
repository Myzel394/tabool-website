import React, {useContext} from "react";
import dayjs from "dayjs";

import TimetableContext from "../TimetableContext";

const VALID_WEEKDAYS = [1, 2, 3, 4, 5];

const MonthEvent = ({
    label,
    date,
}) => {
    const {
        selectedDate,
        onSelectedDateChange,
        selectedColor,
    } = useContext(TimetableContext);
    const isValidWeekday = VALID_WEEKDAYS.includes(dayjs(date).day());

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
            }}
            onClick={updateDate}
            onKeyDown={event => {
                if (event.keyCode === 32) {
                    updateDate();
                }
            }}
        >
            {label}
        </div>
    );
};
export default MonthEvent;


