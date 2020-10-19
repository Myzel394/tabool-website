import React from "react";
import {Box, Typography, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FocusedPage} from "components/pages";
import {ReactSVG} from "react-svg";
import logo from "assets/logo.svg";
import {SimpleCenter} from "components";

import RegisterForm from "./RegisterForm";

export default function Register() {
    const theme = useTheme();
    const {t} = useTranslation();

    const headerColor = {
        color: theme.palette.primary.main,
        fontWeight: 900,
    };

    return (
        <FocusedPage>
            <div>
                <SimpleCenter>
                    <ReactSVG
                        src={logo}
                        beforeInjection={(svg) =>
                            svg.setAttribute("style", "max-width: 10em;margin:0 auto;max-height: 200px")
                        }
                    />
                </SimpleCenter>
            </div>
            <Box marginY={5}>
                <Typography variant="h1" style={headerColor} align="center">
                    {t("Registrieren")}
                </Typography>
            </Box>
            <RegisterForm />
        </FocusedPage>
    );
}
