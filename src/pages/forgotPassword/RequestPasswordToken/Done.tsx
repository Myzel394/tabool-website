import React, {memo} from "react";
import {Box, Typography, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {FaCheckCircle} from "react-icons/all";


const Done = () => {
    const theme = useTheme();
    const {t} = useTranslation();

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <FaCheckCircle size="5rem" color={theme.palette.success.main} />
            <Box my={2}>
                <Typography variant="body1">
                    {t("Wenn du dich nicht vertippt hast, wurde dir eine E-Mail geschickt. " +
                        "Überprüfe deine E-Mails, dort findest du dann Anweisungen, wie du dein Passwort zurücksetzen kannst!")}
                </Typography>
            </Box>
        </Box>
    );
};

export default memo(Done);
