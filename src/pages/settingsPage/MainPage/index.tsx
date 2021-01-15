import React from "react";
import {useTranslation} from "react-i18next";
import {DefaultPage} from "components";
import {Grid} from "@material-ui/core";

import Area from "../Area";

import Permissions from "./Permissions";
import Account from "./Account";
import Statistics from "./Statistics";


const MainPage = () => {
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
                <Grid item>
                    <Area title={t("Statistiken")}>
                        <Statistics />
                    </Area>
                </Grid>
            </Grid>
        </DefaultPage>
    );
};

export default MainPage;
