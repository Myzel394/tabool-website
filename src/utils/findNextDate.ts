import {Dayjs} from "dayjs";

const findNextDate = (startDate: Dayjs, targeted: number): Dayjs => {
    let currentDate = startDate;

    while (currentDate.day() !== targeted) {
        currentDate = currentDate.add(1, "day");
    }

    return currentDate;
};

export default findNextDate;
