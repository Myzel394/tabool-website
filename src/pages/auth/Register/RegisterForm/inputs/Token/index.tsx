import React, {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, FormGroup, FormHelperText} from "@material-ui/core";
import {MdVpnKey} from "react-icons/all";
import {SecondaryButton} from "components/buttons";
import InputWithIcon, {IInputWithIcon} from "components/inputs/InputWithIcon";

import RequestTokenDialog from "./RequestTokenDialog";

export type IToken = Omit<IInputWithIcon, "renderIcon"> & {
    label: string;
    minLength: number;
    maxLength: number;
    onChange: (data: string) => any;

    helpText?: string;
};

const Token = ({minLength, maxLength, label, helpText, onChange, ...other}: IToken) => {
    const {t} = useTranslation();

    const [showRequestDialog, setShowRequestDialog] = useState<boolean>(false);

    const tokenValidator = useCallback(value => {
        const length = value?.length || 0;
        if (length < minLength || length > maxLength) {
            return t("Der Token ist nicht richtig lang. Vielleicht falsch kopiert?");
        }
    }, [minLength, maxLength, t]);

    return (
        <>
            <RequestTokenDialog
                open={showRequestDialog}
                onClose={() => setShowRequestDialog(false)}
            />
            <FormGroup>
                <InputWithIcon
                    {...other}
                    renderIcon={(props) => <MdVpnKey {...props} />}
                    type="text"
                    label={label}
                    validators={[tokenValidator]}
                    onChange={event => onChange(event.target.value.replace(/\s+/, ""))}
                />
                {helpText && <FormHelperText>{helpText}</FormHelperText>}
                <Box marginTop={1}>
                    <SecondaryButton
                        size="small"
                        onClick={() => setShowRequestDialog(true)}
                    >
                        Zugangscode holen
                    </SecondaryButton>
                </Box>
            </FormGroup>
        </>
    );
};

export default memo(Token);
