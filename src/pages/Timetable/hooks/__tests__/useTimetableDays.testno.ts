import {renderHook} from "@testing-library/react-hooks";
import dayjs from "dayjs";
import {isDateEqual} from "utils";
import "tests/storage";

import useTimetableDays, {IUseTimetableDaysData} from "../useTimetableDays";

describe("hook without hash", () => {
    const parameters = {
        view: "month",
    } as IUseTimetableDaysData;

    it("should return current month", () => {
        const {
            selectedDate,
            queryEndDate,
            queryStartDate,
            startDate,
        } = renderHook(() => useTimetableDays(parameters)).result.current;

        const today = dayjs();
        const startOfMonth = today.startOf("month");

        expect(isDateEqual(startOfMonth, startDate));
    });
});
