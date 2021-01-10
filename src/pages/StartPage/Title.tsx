import React from "react";
import {useUser} from "hooks";
import {Typography, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";


const Title = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const user = useUser();

    return (
        <Typography
            variant="h1"
            style={{
                fontWeight: 900,
                color: theme.palette.primary.main,
            }}
            align="center"
        >
            {t("Hallo {{name}}!", {
                name: user.data?.firstName,
            })}
        </Typography>
    );
};

export default Title;
