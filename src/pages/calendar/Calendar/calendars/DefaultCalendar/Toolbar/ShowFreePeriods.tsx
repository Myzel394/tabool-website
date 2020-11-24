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
                        color="primary"
                        onChange={event => onChange(event.target.checked)}
                    />
                )}
                disabled={isDisabled}
                label={t("Freistunden anzeigen")}
            />
        </FormGroup>
    );
};

export default ShowFreePeriods;
