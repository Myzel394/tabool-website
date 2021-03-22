import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef} from "react";
import {Dayjs} from "dayjs";
import {usePrevious} from "hooks";
import {useDebouncedValue} from "@shopify/react-hooks";

import {ITimetableContext} from "../TimetableContext";
import {findNextDate} from "../../../utils";

export interface IUseTimetableDaysData {
    startDate: Dayjs;
    updateStartDate: Dispatch<SetStateAction<Dayjs>>;

    selectedDate: Dayjs | null;
    updateSelectedDate: (newDate: Dayjs | null) => any;

    view: ITimetableContext["view"];
}

const getDates = (view: ITimetableContext["view"], activeDate: Dayjs): [Dayjs, Dayjs] => {
    switch (view) {
        case "month": {
            const startOfMonth = activeDate.startOf("month");
            const endOfMonth = activeDate.endOf("month");
            const paddedEnd = findNextDate(endOfMonth, 0);

            return [startOfMonth, paddedEnd];
        }
        case "day":
        case "work_week": {
            const startOfWeek = activeDate.startOf("week");
            const endOfWorkWeek = activeDate.endOf("week")
                .subtract(1, "day");

            return [startOfWeek, endOfWorkWeek];
        }
    }
};

const useTimetableDays = ({
    selectedDate,
    startDate,
    updateSelectedDate,
    updateStartDate,
    view,
}: IUseTimetableDaysData): [Dayjs, Dayjs] => {
    const $isInitializing = useRef<boolean>(false);
    const previousStartDate = usePrevious(startDate, undefined);

    const [queryStartDate, queryEndDate] = useDebouncedValue(getDates(view, startDate), {
        timeoutMs: 600,
    });

    // Deselect selectedDate on date change
    useEffect(() => {
        if (selectedDate && previousStartDate) {
            if (selectedDate.isSame(previousStartDate, "month")) {
                updateStartDate(selectedDate);
            } else if ($isInitializing.current) {
                $isInitializing.current = false;
            } else {
                updateSelectedDate(null);
            }
        }
    }, [previousStartDate, selectedDate, updateSelectedDate, updateStartDate]);

    // Deselect selectedDate on view change
    useEffect(() => {
        if (view !== "month" && selectedDate) {
            updateSelectedDate(null);
        }
    }, [view, selectedDate, updateSelectedDate]);

    // Jump to right month
    useLayoutEffect(() => {
        if (!previousStartDate) {
            if (selectedDate) {
                $isInitializing.current = true;
                updateStartDate(prevDate => prevDate.startOf("month"));
            }
        }
    }, [selectedDate, previousStartDate, updateStartDate, updateSelectedDate]);

    // Update date on view change
    useLayoutEffect(() => {
        if (view !== "month") {
            switch (startDate.day()) {
                case 0:
                case 6:
                    updateStartDate(startDate.startOf("week"));
                    break;
            }
        }
    }, [view, startDate, updateStartDate]);

    return [queryStartDate, queryEndDate];
};

export default useTimetableDays;
