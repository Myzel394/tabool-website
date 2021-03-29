import React from "react";
import {useTranslation} from "react-i18next";
import {DefaultPage} from "components";
import {Box, Grid, Typography} from "@material-ui/core";
import {useTitle, useUser} from "hooks";
import {UserType} from "api";

import Area from "../Area";

import Permissions from "./Permissions";
import Account from "./Account";
import Design from "./Design";
import Faq from "./Faq";
import DataShare from "./DataShare";
import StudentInformation from "./StudentInformation";
import Language from "./Language";

const MainPage = () => {
    const {t} = useTranslation();
    const user = useUser();

    useTitle(t("Einstellungen"));

    // Just for typescript
    if (!user.data) {
        return null;
    }

    return (
        <DefaultPage>
            <Box px={3}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12}>
                        <Area title={t("Account")}>
                            <Account />
                        </Area>
                    </Grid>
                    {user.data.userType === UserType.Student && (
                        <Grid item xs={12}>
                            <Area title={t("Dein Lehrer")}>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-ignore: Student data is given (it's previously just checked) */}
                                <StudentInformation {...user.data.student} />
                            </Area>
                        </Grid>
                    )}
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
                        <Area title={t("Sprache")}>
                            <Language />
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
            </Box>
        </DefaultPage>
    );
};

export default MainPage;
