import {Box, MenuItem, Select, Typography} from "@material-ui/core";
import React, {ReactNode, useMemo} from "react";
import {useUniqueId} from "hooks";
import {useTranslation} from "react-i18next";

export type CalendarType = "lesson" | "homeworkDue" | "homeworkCreated";

export interface ITypeChanger {
    activeType: CalendarType;
    onChange: (newType: CalendarType) => any;
}

const TypeChanger = ({activeType, onChange}: ITypeChanger) => {
    const {t} = useTranslation();
    const calendarTypes = useMemo(() => [
        ["lesson", t("Stundenplan"), t("Zeige den Standard-Stundenplan")],
        ["homeworkDue", t("Hausaufgabenheft"), t("Zeige nach wann die Hausaufgaben aufgegeben wurden")],
        ["homeworkCreated", t("Hausaufgabenplan"), t("Zeige nach Fälligkeitsdatum der Hausaufgaben")],
    ], [t]);
    const labelId = useUniqueId();
    const renderValue = (givenValue): ReactNode => {
        const element = calendarTypes.filter(currentElement => currentElement[0] === givenValue)[0];

        return (
            <Typography>
                {element[1]}
            </Typography>
        );
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Box mr={1}>
                <Typography>
                    {t("Anzeigen nach...")}
                </Typography>
            </Box>
            <Select
                labelId={labelId}
                value={activeType}
                renderValue={renderValue}
                onChange={event => onChange(event.target.value as CalendarType)}
            >
                {calendarTypes.map(([value, title, description]) =>
                    <MenuItem key={value} value={value}>
                        <Box>
                            <Typography>
                                {title}
                            </Typography>
                            <Typography variant="body2">
                                {description}
                            </Typography>
                        </Box>
                    </MenuItem>)}
            </Select>
        </Box>
    );
};

export default TypeChanger;
