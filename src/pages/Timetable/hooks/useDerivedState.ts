import dayjs, {Dayjs} from "dayjs";
import useHashState from "use-hash-state";
import {useCallback, useMemo} from "react";
import {lazyDatetime} from "utils";
import * as yup from "yup";

export interface IUseDerivedStateResult {
    selectedDate: Dayjs | null;
    setSelectedDate: (newDate: Dayjs | null) => void;
}

export interface IInitialState {
    selectedDate: Dayjs | null;
}

const initialState: IInitialState = {
    selectedDate: null,
};

const stateSchema = yup.object({
    selectedDate: yup
        .string()
        .nullable()
        .test(
            value =>
                value === null ||
                (typeof value === "string" && dayjs(value)
                    .isValid()),
        )
    ,
});

const useDerivedState = (): IUseDerivedStateResult => {
    const {
        state: {
            selectedDate: selectedDateAsString,
        },
        setStateAtKey,
    } = useHashState<IInitialState>(initialState, {
        customValidator: obj => stateSchema.isValidSync(obj),
        validateKeysAndTypes: false,
    });
    const selectedDate = useMemo(
        () => (selectedDateAsString ? dayjs(selectedDateAsString) : null),
        [selectedDateAsString],
    );
    const setSelectedDate = useCallback(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (newDate: Dayjs | null) => setStateAtKey("selectedDate", lazyDatetime(newDate, "date")),
        [setStateAtKey],
    );

    return {
        selectedDate,
        setSelectedDate,
    };
};

export default useDerivedState;
