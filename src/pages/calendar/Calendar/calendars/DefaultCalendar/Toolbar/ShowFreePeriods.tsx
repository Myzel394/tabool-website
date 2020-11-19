import React from "react";
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export interface IShowFreePeriods {
    value: boolean;
    onChange: (value: boolean) => any;
    disabled: boolean;
}

const ShowFreePeriods = ({value, onChange, disabled}: IShowFreePeriods) => {
    const {t} = useTranslation();

    return (
        <FormGroup>
            <FormControlLabel
                control={(
                    <Switch
                        checked={value}
                        disabled={disabled}
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
