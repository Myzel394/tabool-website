import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Box, Button, CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {MdDateRange} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {TeacherHomeworkDetail} from "types";
import {findNextDate, replaceDatetime} from "utils";

import Picker from "./Picker";


export interface IDueDateChanger {
    homework: TeacherHomeworkDetail;
    isLoading: boolean;
    onChange: (newDate: Dayjs | null) => any;
}

const getDatesForWeekdays = (weekdays: number[]): Dayjs[] => {
    const today = replaceDatetime(dayjs(), "time");
    const nextDates = weekdays
        .map(weekday => findNextDate(today, weekday))
        .filter(date => date.isAfter(today));

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
    homework,
}: IDueDateChanger) => {
    const {t} = useTranslation();
    const classes = useClasses();

    const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

    return (
        <>
            <ListItem button disabled={isLoading} onClick={() => setIsSelectMode(true)}>
                <ListItemIcon>
                    <MdDateRange size="1.5rem" />
                </ListItemIcon>
                <ListItemText
                    primary={t("Fälligkeitsdatum ändern")}
                />
                {isLoading && <CircularProgress color="inherit" size="1rem" />}
            </ListItem>
            <Box display="flex" flexWrap="nowrap" className={classes.wrapper}>
                <Button
                    size="small"
                    disabled={isLoading}
                    onClick={() => onChange(null)}
                >
                    {t("Leeren")}
                </Button>
                <Button
                    size="small"
                    disabled={isLoading}
                    onClick={() => {
                        const weekdays = homework.lesson.course.weekdays;
                        const nextDate = getDatesForWeekdays(weekdays)[0];

                        setIsSelectMode(false);
                        onChange(nextDate);
                    }}
                >
                    {t("Nächste Stunde")}
                </Button>
                <Button
                    size="small"
                    disabled={isLoading}
                    onClick={() => {
                        const weekdays = homework.lesson.course.weekdays;
                        const date = getDatesForWeekdays(weekdays)[0];

                        setIsSelectMode(false);
                        onChange(date);
                    }}
                >
                    {t("Übernächste Stunde")}
                </Button>
            </Box>
            <Picker
                isOpen={isSelectMode}
                value={homework.dueDate}
                onClose={() => setIsSelectMode(false)}
                onUpdate={date => {
                    setIsSelectMode(false);
                    onChange(date);
                }}
            />
        </>
    );
};

export default DueDateChanger;
