import React from "react";
import {Dayjs} from "dayjs";
import {Grid, Typography} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import {useTranslation} from "react-i18next";

import DaysSelect from "./DaysSelect";


export interface FormProps {
    date: Dayjs;
    onDateChange: (newDate: Dayjs) => any;
}

const Form = ({
    date,
    onDateChange,
}: FormProps) => {
    const {t} = useTranslation();

    return (
        <Grid container direction="column" justify="center" spacing={3}>
            <Grid item>
                <Typography variant="body2" color="textSecondary">
                    {t("Wähle Datum aus, und wie weit maximal Hausaufgaben, Events, Videokonferenzen etc. geladen werden.")}
                </Typography>
            </Grid>
            <Grid item>
                <DatePicker
                    value={date}
                    format="LL"
                    inputVariant="outlined"
                    label={t("Datum")}
                    onChange={newDate => {
                        if (newDate) {
                            onDateChange(newDate);
                        }
                    }}
                />
            </Grid>
            <Grid item>
                <DaysSelect />
            </Grid>
        </Grid>
    );
};

export default Form;
