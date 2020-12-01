import React, {memo, useState} from "react";
import {Box, Container, Grid, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import dayjs, {Dayjs} from "dayjs";
import FormElement from "components/FormElement";
import {FaInfoCircle} from "react-icons/all";
import {TextInput} from "components";

const HomeworkAddPage = () => {
    const {t} = useTranslation();

    const [information, setInformation] = useState<string>("");
    const [dueDate, setDueDate] = useState<Dayjs>(dayjs());
    const [type, setType] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h1" align="center" color="textSecondary">
                    {t("Hausaufgabe hinzufügen")}
                </Typography>
                <Box my={2}>

                    <Paper>
                        <Box p={2} component="form">
                            <Grid container spacing={4} direction="column">
                                <Grid item>
                                    <FormElement
                                        title={t("Informationen")}
                                        icon={<FaInfoCircle />}
                                        form={(
                                            <TextInput
                                                multiline
                                                value={information}
                                                name="information"
                                                inputMode="text"
                                                onChange={event => setInformation(event.target.value)}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        title={t("Fälligkeitsdatum")}
                                        icon={<FaInfoCircle />}
                                        form={(
                                            <TextInput
                                                multiline
                                                value={information}
                                                name="information"
                                                inputMode="text"
                                                onChange={event => setInformation(event.target.value)}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default memo(HomeworkAddPage);
