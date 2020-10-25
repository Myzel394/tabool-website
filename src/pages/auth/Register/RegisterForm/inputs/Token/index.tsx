import React, {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, FormGroup, FormHelperText} from "@material-ui/core";
import {MdVpnKey} from "react-icons/all";
import {SecondaryButton} from "components/buttons";
import InputWithIcon, {IInputWithIcon} from "components/inputs/InputWithIcon";

import RequestTokenDialog from "./RequestTokenDialog";

export type IToken = Omit<IInputWithIcon, "renderIcon"> & {
    onChange: (data: string) => any;

    helpText?: string;
};

const MIN_LENGTH = 127;
const MAX_LENGTH = 127;

const Token = ({minLength, maxLength, label, helpText, onChange, ...other}: IToken) => {
    const {t} = useTranslation();

    const [showRequestDialog, setShowRequestDialog] = useState<boolean>(false);

    const tokenValidator = useCallback(value => {
        const length = value?.length || 0;
        if (length < MIN_LENGTH || length > MAX_LENGTH) {
            return t("Der Token ist nicht richtig lang. Vielleicht falsch kopiert?");
        }
    }, [t]);

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
                    label={t("Token")}
                    type="text"
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
