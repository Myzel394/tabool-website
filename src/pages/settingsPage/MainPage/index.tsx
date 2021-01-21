import React from "react";
import {useTranslation} from "react-i18next";
import {DefaultPage} from "components";
import {Container, Grid} from "@material-ui/core";

import Area from "../Area";

import Permissions from "./Permissions";
import Account from "./Account";
import Statistics from "./Statistics";
import Design from "./Design";
import Faq from "./Faq";

const MainPage = () => {
    const {t} = useTranslation();

    return (
        <DefaultPage>
            <Container maxWidth="md">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12}>
                        <Area title={t("Account")}>
                            <Account />
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Area title={t("Berechtigungen")}>
                            <Permissions />
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Area title={t("Design")}>
                            <Design />
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Area title={t("Statistiken")}>
                            <Statistics />
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Area title={t("Fragen")}>
                            <Faq />
                        </Area>
                    </Grid>
                </Grid>
            </Container>
        </DefaultPage>
    );
};

export default MainPage;
