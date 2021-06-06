import React from "react";
import {MdCancel, MdCheckCircle} from "react-icons/all";
import {useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import {Information} from "../functional";

export interface BooleanStatusProps {
    value: boolean;
}

const BooleanStatus = ({value}: BooleanStatusProps) => {
    const {t} = useTranslation();
    const theme = useTheme();

    return (
        <Information
            getIcon={props =>
                (value
                    ? <MdCheckCircle {...props} color={theme.palette.success.main} />
                    : <MdCancel {...props} color={theme.palette.error.main} />)
            }
            text={value ? t("Ja") : t("Nein")}
        />
    );
};

export default BooleanStatus;
