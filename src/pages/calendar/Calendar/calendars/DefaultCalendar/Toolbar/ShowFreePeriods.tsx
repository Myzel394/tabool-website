import React from "react";
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export interface IShowFreePeriods {
    value: boolean;
    onChange: (value: boolean) => any;
}

const ShowFreePeriods = ({value, onChange}: IShowFreePeriods) => {
    const {t} = useTranslation();

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={value} onChange={event => onChange(event.target.checked)} />}
                label={t("Freistunden anzeigen")}
            />
        </FormGroup>
    );
};

export default ShowFreePeriods;
