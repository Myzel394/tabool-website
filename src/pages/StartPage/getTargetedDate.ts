import dayjs, {Dayjs} from "dayjs";

const getTargetedDate = (): Dayjs => {
    let today = dayjs();
    const weekday = today.day();

    if (weekday === 0) {
        today = today.add(1, "day");
    } else if (weekday === 6) {
        today = today.add(2, "day");
    }

    return today;
};

export default getTargetedDate;
