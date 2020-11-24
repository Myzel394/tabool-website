import {Box, FormControlLabel, MenuItem, Select, Typography} from "@material-ui/core";
import React, {ReactNode, useContext} from "react";
import {useUniqueId} from "hooks";
import {useTranslation} from "react-i18next";

import CalendarContext, {CalendarType} from "../../../../CalendarContext";

const TypeChanger = () => {
    const {calendarType, onCalendarTypeChange: onChange} = useContext(CalendarContext);
    const {t} = useTranslation();
    const calendarTypes = [
        ["lesson", t("Stundenplan"), t("Zeige den Standard-Stundenplan")],
        ["homework", t("Hausaufgabenheft"), t("Zeige nach wann Hausaufgaben aufgegeben wurden")],
    ];
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
        <FormControlLabel
            control={(
                <Box ml={1}>
                    <Select
                        labelId={labelId}
                        value={calendarType}
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
            )}
            label={t("Anzeigen nach...")}
            labelPlacement="start"
        />
    );
};

export default TypeChanger;
