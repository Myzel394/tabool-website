import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Box, Button, CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {MdDateRange} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {findNextDate, replaceDatetime} from "utils";
import {renderDayWithLessonWeekdays} from "components/index";

import Picker, {IPicker} from "./Picker";


export interface IDueDateChanger {
    weekdays: number[];
    color: string;
    date: Dayjs | null;
    isLoading: boolean;
    pickerType: IPicker["pickerType"];
    title: string;
    onChange: (newDate: Dayjs | null) => any;
    disabled?: boolean;
}

const getDatesForWeekdays = (weekdays: number[], startDate?: Dayjs): Dayjs[] => {
    const start = replaceDatetime(startDate || dayjs(), "time");
    const nextDates = weekdays
        .map(weekday => findNextDate(start, weekday))
        .filter(date => date.add(1, "second").isAfter(start));

    return nextDates;
};

const useClasses = makeStyles(() => ({
    wrapper: {
        overflowX: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        "& > button": {
            flex: "0 0 auto",
        },
    },
}));

const DueDateChanger = ({
    isLoading,
    onChange,
    date,
    weekdays,
    pickerType,
    color,
    title,
    disabled,
}: IDueDateChanger) => {
    const {t} = useTranslation();
    const classes = useClasses();

    const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

    const renderDay = renderDayWithLessonWeekdays(weekdays, color);

    return (
        <>
            <ListItem button disabled={isLoading || disabled} onClick={() => setIsSelectMode(true)}>
                <ListItemIcon>
                    <MdDateRange size="1.5rem" />
                </ListItemIcon>
                <ListItemText
                    primary={title}
                />
                {isLoading && <CircularProgress color="inherit" size="1rem" />}
            </ListItem>
            <Box display="flex" flexWrap="nowrap" className={classes.wrapper}>
                <Button
                    size="small"
                    disabled={isLoading || disabled}
                    onClick={() => onChange(null)}
                >
                    {t("Leeren")}
                </Button>
                <Button
                    size="small"
                    disabled={isLoading || disabled}
                    onClick={() => onChange(dayjs())}
                >
                    {pickerType === "date" ? t("Heute") : t("Jetzt")}
                </Button>
                <Button
                    size="small"
                    disabled={isLoading || disabled}
                    onClick={() => {
                        const nextDate = getDatesForWeekdays(weekdays)[0];

                        setIsSelectMode(false);
                        onChange(nextDate);
                    }}
                >
                    {t("Nächste Stunde")}
                </Button>
                <Button
                    size="small"
                    disabled={isLoading || disabled}
                    onClick={() => {
                        const nextDate = getDatesForWeekdays(weekdays)[0];
                        const targetedDate = getDatesForWeekdays(weekdays, nextDate.add(1, "day"))[0];

                        setIsSelectMode(false);
                        onChange(targetedDate);
                    }}
                >
                    {t("Übernächste Stunde")}
                </Button>
            </Box>
            <Picker
                renderDay={renderDay}
                pickerType={pickerType}
                isOpen={isSelectMode}
                value={date}
                onClose={() => setIsSelectMode(false)}
                onUpdate={date => {
                    setIsSelectMode(false);
                    onChange(date);
                }}
            />
        </>
    );
};

DueDateChanger.defaultProps = {
    pickerType: "date",
};

export default DueDateChanger;
