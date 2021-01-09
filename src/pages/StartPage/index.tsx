import React from "react";
import {useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useUser} from "hooks";


const StartPage = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const user = useUser();

    return null;

    /*
    return (
        <Box my={2}>
            <Title />
            <Content title={t("Stundenplan")}>
                <Timetable />
            </Content>
        </Box>
    );*/
};

export default StartPage;
