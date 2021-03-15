import React, {useContext} from "react";
import dayjs from "dayjs";

import TimetableContext from "../TimetableContext";


const MonthEvent = ({
    label,
    date,
}) => {
    const {
        selectedDate,
        onSelectedDateChange,
        selectedColor,
    } = useContext(TimetableContext);

    const updateDate = () => {
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


