import React, {memo} from "react";
import {MdCancel, MdCheckCircle} from "react-icons/all";
import {useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import Information from "./Information";

export interface IBooleanStatus {
    value: boolean;
}

const BooleanStatus = ({value}: IBooleanStatus) => {
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

export default memo(BooleanStatus);
