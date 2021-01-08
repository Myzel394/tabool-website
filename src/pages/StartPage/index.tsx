import React from "react";
import {Box, useTheme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useUser} from "hooks";

import Title from "./Title";
import Content from "./Content";
import Timetable from "./Timetable";


const StartPage = () => {
    const theme = useTheme();
    const {t} = useTranslation();
    const user = useUser();

    return (
        <Box my={2}>
            <Title />
            <Content title={t("Stundenplan")}>
                <Timetable />
            </Content>
        </Box>
    );
};

export default StartPage;
