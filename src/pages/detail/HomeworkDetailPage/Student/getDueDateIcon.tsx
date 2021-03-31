import {FaHourglassEnd, FaHourglassHalf, FaHourglassStart, FaRegHourglass} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";
import React from "react";

const getDueDateIcon = (dueDate: Dayjs, ignore: boolean): JSX.Element => {
    if (ignore) {
        return <FaRegHourglass />;
    }

    const today = dayjs();
    const diff = dueDate.diff(today, "day");

    if (diff < 0) {
        return <FaHourglassEnd />;
    } else if (diff > 7) {
        return <FaHourglassStart />;
    } else {
        return <FaHourglassHalf />;
    }
};

export default getDueDateIcon;
