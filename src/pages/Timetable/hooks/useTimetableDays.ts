import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {usePrevious} from "hooks";
import {useDebouncedValue} from "@shopify/react-hooks";
import {findNextDate} from "utils";

import {ITimetableContext} from "../TimetableContext";

export interface IUseTimetableDaysData {
    view: ITimetableContext["view"];
}

export interface IUseTimetableDaysResult {
    selectedDate: Dayjs | null;
    setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;

    startDate: Dayjs;
    setStartDate: Dispatch<SetStateAction<Dayjs>>;

    queryStartDate: Dayjs;
    queryEndDate: Dayjs;
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

const getDateFromHash = (): Dayjs | null => {
    try {
        const date = dayjs(window.location.hash?.slice(1));

        if (date.isValid()) {
            return date;
        }
        // eslint-disable-next-line no-empty
    } catch (err) {
    }

    return null;
};

const useTimetableDays = ({
    view,
}: IUseTimetableDaysData): IUseTimetableDaysResult => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(getDateFromHash);
    const [startDate, setStartDate] = useState<Dayjs>(dayjs);

    const $isInitializing = useRef<boolean>(false);
    const previousStartDate = usePrevious(startDate, undefined);

    const [queryStartDate, queryEndDate] = useDebouncedValue(getDates(view, startDate), {
        timeoutMs: 600,
    });

    // Jump to right month
    useLayoutEffect(() => {
        if (!previousStartDate) {
            if (selectedDate) {
                $isInitializing.current = true;
                setStartDate(selectedDate.startOf("month"));
            }
        }
    }, [selectedDate, previousStartDate, setStartDate, setSelectedDate]);

    // Update date on view change
    useLayoutEffect(() => {
        if (view !== "month") {
            switch (startDate.day()) {
                case 0:
                case 6:
                    setStartDate(startDate.startOf("week"));
                    break;
            }
        }
    }, [view, startDate, setStartDate]);

    // Deselect selectedDate on view change
    useLayoutEffect(() => {
        if (view !== "month" && selectedDate) {
            setSelectedDate(null);
        }
    }, [view, selectedDate, setSelectedDate]);

    // Deselect selectedDate on date change
    useEffect(() => {
        if (selectedDate && previousStartDate) {
            if (selectedDate.isSame(previousStartDate, "month")) {
                setStartDate(selectedDate);
            } else if ($isInitializing.current) {
                // Ignore if initializing (date from hash is being set)
                $isInitializing.current = false;
            } else {
                setSelectedDate(null);
            }
        }
    }, [previousStartDate, selectedDate, setSelectedDate, setStartDate]);

    return {
        selectedDate,
        startDate,
        queryEndDate,
        queryStartDate,
        setSelectedDate,
        setStartDate,
    };
};

export default useTimetableDays;
