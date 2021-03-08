import React from "react";
import {Field} from "formik";
import {DateTimePicker} from "formik-material-ui-pickers";
import {useTranslation} from "react-i18next";
import {InputAdornment} from "@material-ui/core";
import {FaCalendarDay} from "react-icons/all";
import {useColors} from "hooks";

const VALID_WEEKDAYS = [1, 2, 3, 4, 5];

const HomeworkDueDateField = ({InputProps, ...other}: any) => {
    const {
        inputIconColor,
    } = useColors();
    const {t} = useTranslation();

    return (
        <Field
            disablePast
            label={t("Fälligkeitsdatum")}
            component={DateTimePicker}
            shouldDisableDate={date => !VALID_WEEKDAYS.includes(date.day())}
            inputVariant="outlined"
            ampm={false}
            format="LLL"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <FaCalendarDay color={inputIconColor} />
                    </InputAdornment>
                ),
                ...(InputProps ?? {}),
            }}
            {...other}
        />
    );
};
export default HomeworkDueDateField;


