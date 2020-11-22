import React, {useContext} from "react";
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Tooltip} from "components";

import CalendarContext from "../../../../CalendarContext";

const ShowDetails = () => {
    const {showDetails, onShowDetailsChange, calendarType} = useContext(CalendarContext);
    const {t} = useTranslation();
    const isDisabled = calendarType !== "lesson";

    return (
        <Tooltip title={t("Die Anzeige wird detaillierter, dauert aber auch länger um berechnet zu werden.").toString()}>
            <FormGroup>
                <FormControlLabel
                    control={(
                        <Switch
                            checked={showDetails}
                            disabled={isDisabled}
                            color="primary"
                            onChange={event => onShowDetailsChange(event.target.checked)}
                        />
                    )}
                    label={t("Details anzeigen")}
                />
            </FormGroup>
        </Tooltip>
    );
};

export default ShowDetails;
