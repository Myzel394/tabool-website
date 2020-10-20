import React, {memo} from "react";
import {FormGroup, FormHelperText} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import InputWithIcon, {IInputWithIcon} from "components/inputs/InputWithIcon";
import {MdLock} from "react-icons/all";


export type IConfirmKey = Omit<IInputWithIcon, "renderIcon"> & {
    onChange: (value: string) => any;
};

const ConfirmKey = ({onChange, ...other}: IConfirmKey) => {
    const {t} = useTranslation();

    return (
        <FormGroup>
            <InputWithIcon
                {...other}
                renderIcon={(props) => <MdLock {...props} />}
                type="string"
                label={t("Bestätigungscode")}
                onChange={event => onChange(event.target.value)}
            />
            <FormHelperText>{t("Gib den Bestätitungscode ein, der dir per Mail geschickt wurde. Es kann unter Umständen etwas dauern, bis die E-Mail geschickt wird.")}</FormHelperText>
        </FormGroup>
    );
};

export default memo(ConfirmKey);
