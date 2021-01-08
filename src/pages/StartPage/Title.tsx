import React from "react";
import {useUser} from "hooks";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";


const Title = () => {
    const {t} = useTranslation();
    const user = useUser();

    return (
        <Typography
            variant="h1"
            style={{
                fontWeight: 900,
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
