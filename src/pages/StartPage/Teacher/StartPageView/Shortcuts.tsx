import React from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import {buildPath} from "utils";
import {ExamIcon, HomeworkIcon} from "components";
import {useTranslation} from "react-i18next";

const useClasses = makeStyles({
    list: {
        "& > li": {
            listStyle: "none",
            paddingLeft: 0,
        },
    },
});

const Shortcuts = () => {
    const {t} = useTranslation();
    const classes = useClasses();

    return (
        <Box
            display="flex"
            pl={0}
            mx="auto"
            width="auto"
            flexDirection="column"
            component="ul"
            className={classes.list}
        >
            <li>
                <Button
                    component="a"
                    href={buildPath("/add/homework/")}
                    startIcon={<HomeworkIcon />}
                >
                    {t("Hausaufgabe hinzufügen")}
                </Button>
            </li>
            <li>
                <Button
                    component="a"
                    href={buildPath("/add/exam")}
                    startIcon={<ExamIcon />}
                >
                    {t("Arbeit hinzufügen")}
                </Button>
            </li>
        </Box>
    );
};
export default Shortcuts;

