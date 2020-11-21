import React, {useContext} from "react";
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import CalendarContext from "../../../../CalendarContext";

const ShowFreePeriods = () => {
    const {showFreePeriods, calendarType, onShowFreePeriodsChange: onChange} = useContext(CalendarContext);
    const {t} = useTranslation();
    const isDisabled = calendarType !== "lesson";

    return (
        <FormGroup>
            <FormControlLabel
                control={(
                    <Switch
                        checked={showFreePeriods}
                        disabled={isDisabled}
                        color="primary"
                        onChange={event => onChange(event.target.checked)}
                    />
                )}
                label={t("Freistunden anzeigen")}
            />
        </FormGroup>
    );
};

export default ShowFreePeriods;
