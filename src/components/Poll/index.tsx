import React, {useEffect, useState} from "react";
import {PollChoice, UserVote, VoteResult} from "types";
import dayjs, {Dayjs} from "dayjs";
import {Box, Checkbox, Collapse, Container, Drawer, FormControlLabel, TextField, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {IVotePollData, IVotePollResponse, useVotePollAPI} from "hooks/apis";

import {PrimaryButton} from "../buttons";

import SingleChoice from "./SingleChoice";
import MultipleChoice from "./MultipleChoice";


export interface IPoll {
    id: string;
    title: string;
    choices: PollChoice[];
    maxVoteChoices: number;

    results?: VoteResult[] | null;
    userVote?: UserVote | null;
    maxVoteDate?: Dayjs | null;
    showResultsDate?: Dayjs | null;
}

const style = {
    drawer: {
        borderRadius: "2em 2em 0 0",
    },
    background: {
        background: "rgba(0, 0, 0, .8)",
    },
};

const Poll = ({
    id,
    choices,
    maxVoteChoices,
    maxVoteDate,
    title,
}: IPoll) => {
    const {t} = useTranslation();
    const votePoll = useVotePollAPI();

    const [value, setValue] = useState<any>();
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    const {
        mutate,
    } = useMutation<IVotePollResponse, AxiosError, IVotePollData>(
        (values) => votePoll(id, values),
    );

    const diffDays = maxVoteDate?.diff(dayjs(), "day");
    const hasSelected = maxVoteChoices === 1 ? Boolean(value) : value?.length === maxVoteChoices;

    // Animate in
    useEffect(() => {
        setTimeout(() => setIsOpen(true), 50);
    }, []);

    return (
        <Drawer
            PaperProps={{
                style: style.drawer,
            }}
            open={isOpen}
            anchor="bottom"
            BackdropProps={{
                style: style.background,
            }}
        >
            <Container maxWidth="md">
                <Box p={2}>
                    <Typography variant="h2">
                        {title}
                    </Typography>
                    {diffDays && diffDays <= 5 && (
                        <Typography variant="body2" color={diffDays === 1 ? "error" : "textSecondary"}>
                            {t("Du kannst noch {{count}} Tage abstimmen.", {
                                count: diffDays,
                            })}
                        </Typography>
                    )}
                    <Box py={4}>
                        <Box pb={2}>
                            {maxVoteChoices === 1
                                ? <SingleChoice value={value} choices={choices} onChange={setValue} />
                                : <MultipleChoice value={value} choices={choices} voteChoicesAmount={maxVoteChoices} onChange={setValue} />}
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showFeedback}
                                        onChange={event => setShowFeedback(event.target.checked)}
                                    />
                                }
                                label={t("Feedback schreiben")}
                                disabled={!hasSelected}
                            />
                            <Collapse in={showFeedback}>
                                <Box pt={1}>
                                    <TextField
                                        multiline
                                        fullWidth
                                        label={t("Feedback")}
                                        inputProps={{
                                            maxLength: 1023,
                                        }}
                                        variant="outlined"
                                        helperText={t("Beschreibe deine Anregungen, Wünsche, etc.")}
                                        onChange={event => setFeedback(event.target.value)}
                                    />
                                </Box>
                            </Collapse>
                        </Box>
                    </Box>
                    <PrimaryButton
                        disabled={!hasSelected} onClick={() => {
                            setIsOpen(false);
                            mutate({
                                feedback,
                                choicesIds: Array.isArray(value) ? value : [value],
                            });
                        }}
                    >
                        {t("Abstimmen & Schließen")}
                    </PrimaryButton>
                </Box>
            </Container>
        </Drawer>
    );
};

export default Poll;
