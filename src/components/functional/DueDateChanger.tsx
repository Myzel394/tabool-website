import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Button, CircularProgress, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDateRange} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {findNextDate, replaceDatetime} from "utils";

import Picker, {PickerProps} from "../inputs/Picker";
import renderDayWithLessonWeekdays from "../../modules/renderDayWithLessonWeekdays";

import HorizontalScrollWrapper from "./HorizontalScrollWrapper";

interface Base {
    isLoading: boolean;
    pickerType: PickerProps["pickerType"];
    title: string;

    disabled?: boolean;
    disableClearing?: boolean;

    weekdays: number[];
    color: string;
}

export interface WithDate {
    date: Dayjs;
    onChange: (newDate: Dayjs) => any;
    disableClearing: true;
}

export interface WithDateAndNull {
    date: Dayjs | null;
    onChange: (newDate: Dayjs | null) => any;
    disableClearing?: false;
}

export type DueDateChangerProps = Base & (WithDate | WithDateAndNull);

const getDatesForWeekdays = (weekdays: number[], startDate?: Dayjs): Dayjs[] => {
    const start = replaceDatetime(startDate || dayjs(), "time");
    const nextDates = weekdays
        .map(weekday => findNextDate(start, weekday))
        .filter(date => date.add(1, "second").isAfter(start));

    return nextDates;
};

const DueDateChanger = ({
    isLoading,
    onChange,
    date,
    weekdays,
    pickerType,
    color,
    title,
    disabled,
    disableClearing,
}: DueDateChangerProps) => {
    const {t} = useTranslation();

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
            <HorizontalScrollWrapper>
                {!disableClearing && (
                    <Button
                        size="small"
                        disabled={isLoading || disabled}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onClick={() => onChange(null)}
                    >
                        {t("Leeren")}
                    </Button>
                )}
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
            </HorizontalScrollWrapper>
            <Picker
                renderDay={renderDay}
                pickerType={pickerType}
                isOpen={isSelectMode}
                value={date}
                onClose={() => setIsSelectMode(false)}
                onUpdate={date => {
                    setIsSelectMode(false);

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
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
