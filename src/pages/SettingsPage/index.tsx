import React from "react";
import {useTranslation} from "react-i18next";
import {DefaultPage} from "components";
import {Grid} from "@material-ui/core";

import Permissions from "./Permissions";
import Area from "./Area";
import Account from "./Account";


const SettingsPage = () => {
    const {t} = useTranslation();

    return (
        <DefaultPage>
            <Grid container spacing={4}>
                <Grid item>
                    <Area title={t("Account")}>
                        <Account />
                    </Area>
                </Grid>
                <Grid item>
                    <Area title={t("Berechtigungen")}>
                        <Permissions />
                    </Area>
                </Grid>
            </Grid>
        </DefaultPage>
    );
};

export default SettingsPage;
