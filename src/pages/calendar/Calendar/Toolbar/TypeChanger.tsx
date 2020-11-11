import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {useMemo} from "react";
import {useUniqueId} from "hooks";
import {useTranslation} from "react-i18next";

export type CalendarType = "lesson" | "homeworkDue" | "homeworkCreated";

export interface ITypeChanger {
    activeType: CalendarType;
    onChange: (newType: CalendarType) => any;
}

const TypeChanger = ({ activeType, onChange}: ITypeChanger) => {
    const {t} = useTranslation();
    const CALENDAR_TYPES = useMemo(() => [
        ["lesson", t("Stundenplan")],
        ["homeworkDue", t("Hausaufgabenheft (Nach wann aufgegeben)")],
        ["homeworkCreated", t("Hausaufgabenplan (Nach Fälligkeitsdatum)")]
    ], [t]);
    const labelId = useUniqueId();

    return (
        <FormControl>
            <InputLabel id={labelId}>{t("Anzeigen nach...")}</InputLabel>
            <Select
                labelId={labelId}
                value={activeType}
                onChange={event => onChange(event.target.value as CalendarType)}
            >
                {CALENDAR_TYPES.map(([value, text]) =>
                    <MenuItem value={value} key={value}>
                        {text}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default TypeChanger;
