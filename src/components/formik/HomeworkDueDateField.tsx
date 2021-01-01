import React, {memo, useMemo} from "react";
import {FieldProps} from "formik";
import {LessonDetail} from "types";
import {DateTimePicker, DateTimePickerProps} from "@material-ui/pickers";
import {FormGroup, FormHelperText, IconButton, InputAdornment} from "@material-ui/core";
import {BiTimer, MdClear} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";

import renderDayWithLessonWeekdays from "../renderDayWithLessonWeekdays";

export type IHomeworkDueDateField = Omit<DateTimePickerProps, "disablePast" | "inputVariant" | "format" | "renderDay"> & FieldProps & {
    lesson?: LessonDetail | null;

    helperText?: string;
};

const ALLOWED_DAYS = [1, 2, 3, 4, 5];

const HomeworkDueDateField = ({
    field,
    form,
    lesson,
    helperText,
    ...other
}: IHomeworkDueDateField) => {
    const renderDay = useMemo(() => {
        const lessonWeeks = lesson?.lessonData?.weekdays;
        const lessonColor = lesson?.lessonData?.course?.subject?.userRelation?.color;

        return (lessonWeeks && lessonColor) ? renderDayWithLessonWeekdays(
            lessonWeeks,
            lessonColor,
            (date) => Boolean(date && dayjs(date).isAfter(dayjs())),
        ) : undefined;
    }, [lesson?.lessonData?.weekdays, lesson?.lessonData?.course?.subject?.userRelation?.color]);
    const setValue = (value: Dayjs | null) => field.onChange({
        target: {
            name: field.name,
            value,
        },
    });

    const error = form.errors[field.name];
    const hasErrors = Boolean(error);

    return (
        <FormGroup>
            <DateTimePicker
                {...field}
                {...other}
                disablePast
                type="text"
                inputVariant="outlined"
                format="lll"
                ampm={false}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setValue(null);
                                }}
                            >
                                <MdClear />
                            </IconButton>
                        </InputAdornment>
                    ),
                    startAdornment: (
                        <InputAdornment position="start">
                            <BiTimer />
                        </InputAdornment>
                    ),
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                error={hasErrors}
                renderDay={renderDay}
                shouldDisableDate={date => Boolean(date && !ALLOWED_DAYS.includes(date.day()))}
                onChange={setValue}
            />
            <FormHelperText error={hasErrors}>
                {hasErrors ? error : helperText}
            </FormHelperText>
        </FormGroup>
    );
};

export default memo(HomeworkDueDateField);