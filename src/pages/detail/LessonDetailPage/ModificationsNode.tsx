import React, {memo, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Typography} from "@material-ui/core";
import {FaExchangeAlt, MdExpandMore} from "react-icons/all";
import {LessonDetail} from "types";
import {combineDatetime} from "utils";
import {useTranslation} from "react-i18next";

import Modification from "./Modification";

export interface IModificationsNode {
    lesson: LessonDetail;
}

const ModificationsNode = ({lesson}: IModificationsNode) => {
    const {t} = useTranslation();

    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const startDatetime = combineDatetime(lesson.date, lesson.lessonData.startTime);
    const endDatetime = combineDatetime(lesson.date, lesson.lessonData.endTime);

    return (
        <Accordion expanded={isExpanded} onClick={() => setIsExpanded(prevState => !prevState)}>
            <AccordionSummary expandIcon={<MdExpandMore />}>
                <Typography variant="h4">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <FaExchangeAlt />
                        </Grid>
                        <Grid item>
                            {t("Veränderungen")}
                        </Grid>
                    </Grid>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {(() => {
                    if (lesson.modifications.length === 1) {
                        const modification = lesson.modifications[0];

                        if (startDatetime.isSame(modification.startDatetime) && endDatetime.isSame(modification.endDatetime)) {
                            return (
                                <Modification
                                    lesson={lesson}
                                    modification={modification}
                                />
                            );
                        }
                    }
                    return (
                        <Grid container spacing={4} direction="column">
                            {lesson.modifications.map((modification, index) => (
                                <Grid key={modification.id} item>
                                    <Typography variant="h5">
                                        {t("{{indexNumber}} Veränderung von {{startTime}} bis {{endTime}}", {
                                            startTime: modification.startDatetime.format("LT"),
                                            endTime: modification.endDatetime.format("LT"),
                                            indexNumber: `${index + 1}.`,
                                        })}
                                    </Typography>
                                    <Box my={2}>
                                        <Modification
                                            lesson={lesson}
                                            modification={modification}
                                        />
                                    </Box>
                                    <Divider />
                                </Grid>
                            ))}
                        </Grid>
                    );
                })()}
            </AccordionDetails>
        </Accordion>
    );
};

export default memo(ModificationsNode);
