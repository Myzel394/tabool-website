import React, {useContext} from "react";
import {TeacherHomeworkDetail} from "types";
import {Box, Link, List} from "@material-ui/core";
import {SecondaryButton, ShowMoreArray, ShowMoreButton} from "components";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {buildPath, lazyDatetime} from "utils";
import {MdAdd} from "react-icons/all";

import StartPageContext from "../../StartPageContext";

import Homework from "./Homework";

const Homeworks = () => {
    const {t} = useTranslation();
    const {
        dailyData: {homeworks},
        date,
    } = useContext(StartPageContext);

    if (!homeworks.length) {
        return (
            <Box display="flex" alignItems="center" flexDirection="column">
                <Alert severity="info">
                    {t("Keine Hausaufgaben verfügbar")}
                </Alert>
                <Box mt={2}>
                    <Link
                        underline="none"
                        startIcon={<MdAdd />}
                        component={SecondaryButton}
                        href={buildPath("/add/homework/", undefined, {
                            lessonDate: lazyDatetime(date, "date"),
                        })}
                    >
                        {t("Hausaufgabe hinzufügen")}
                    </Link>
                </Box>
            </Box>
        );
    }

    return (
        <List>
            <ShowMoreArray<TeacherHomeworkDetail>
                elements={homeworks}
                maxElements={4}
                renderButton={(isShown, update) =>
                    <ShowMoreButton showMore={isShown} onClick={update} />
                }
            >
                {homework => <Homework homework={homework} />}
            </ShowMoreArray>
        </List>
    );
};

export default Homeworks;
