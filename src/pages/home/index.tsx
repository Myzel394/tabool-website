import React, {memo, useContext, useMemo, useState} from "react";
import {Box, Container, Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {UserContext} from "contexts";
import _ from "lodash";
import tinycolor from "tinycolor2";

import TodayLesson from "./TodayLesson";
import Heading from "./Heading";
import {ColorType} from "./TodayLesson/LessonManager";

const Home = () => {
    const {t} = useTranslation();
    const {state} = useContext(UserContext);
    // Get color of first lesson
    const [colors, setColors] = useState<{
        [key: number]: ColorType;
    }>({});
    const color = useMemo(() => {
        const entries = Object.entries(colors);

        if (entries.length > 0) {
            const orderedEntries = _.orderBy(entries, ([key, x]) => key, "asc");
            let color = orderedEntries[0][1].color;

            for (const [x, value] of orderedEntries) {
                if (value.attendance && tinycolor(value.color).getLuminance() < 0.8) {
                    color = value.color;
                    break;
                }
            }

            return color;
        }

    }, [colors]);

    return (
        <Container maxWidth="sm">
            <Box my={2}>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <Heading
                            title={t("Stundenplan")}
                            color={color}
                        />
                        <TodayLesson
                            onColor={(value, index) => setColors(prev => ({
                                ...prev,
                                [index]: value,
                            }))}
                        />
                    </Grid>
                    <Grid item>
                        <Heading
                            title={t("Hausaufgaben")}
                            color="#e72061"
                        />
                        <Homeworks />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default memo(Home);
