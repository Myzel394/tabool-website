import React, {memo} from "react";
import {IconButton} from "@material-ui/core";
import {MdClear} from "react-icons/all";
import {DatePicker as MUIDatePicker, DatePickerProps} from "@material-ui/pickers";
import {Dayjs} from "dayjs";

export interface IDatePicker extends Omit<DatePickerProps, "inputVariant" | "format" | "onChange"> {
    enableNull: boolean;
    onChange: (value: Dayjs | null) => any;
}

const DatePicker = ({enableNull, value, onChange, ...other}: IDatePicker) => {
    return (
        <>
            <MUIDatePicker
                {...other}
                value={value}
                inputVariant="outlined"
                format="DD/MM/YYYY"
                onChange={date => date && onChange(date)}
            />
            {enableNull && (
                <IconButton
                    edge="end"
                    size="small"
                    disabled={!value}
                    onClick={() => onChange(null)}
                >
                    <MdClear />
                </IconButton>
            )}
        </>
    );
};

DatePicker.defaultProps = {
    enableNull: false,
};

export default memo(DatePicker);
