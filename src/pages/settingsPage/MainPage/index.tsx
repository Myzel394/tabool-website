import React from "react";
import {useTranslation} from "react-i18next";
import {DefaultPage} from "components";
import {Box, Container, Grid, Typography} from "@material-ui/core";
import {useUser} from "hooks";

import Area from "../Area";

import Permissions from "./Permissions";
import Account from "./Account";
import Design from "./Design";
import Faq from "./Faq";
import DataShare from "./DataShare";

const MainPage = () => {
    const {t} = useTranslation();
    const user = useUser();

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
                        <Area title={t("Daten teilen & sammeln")}>
                            <DataShare />
                        </Area>
                    </Grid>
                    <Grid item xs={12}>
                        <Area title={t("Fragen")}>
                            <Faq />
                        </Area>
                    </Grid>
                </Grid>
                <Box mt={6} mb={2} alignItems="center">
                    <Typography variant="body2" color="textSecondary" align="center">
                        {t("Deine Benutzer-ID: {{id}}", {
                            id: user.data?.id,
                        })}
                    </Typography>
                </Box>
            </Container>
        </DefaultPage>
    );
};

export default MainPage;
