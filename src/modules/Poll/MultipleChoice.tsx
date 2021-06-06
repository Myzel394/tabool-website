import React from "react";
import {Box, Checkbox, FormControlLabel, FormGroup, Typography} from "@material-ui/core";
import {PollChoice} from "types";
import {Trans, useTranslation} from "react-i18next";
import {ButtonLike} from "components";


export interface MultipleChoiceProps {
    onChange: (value: string[]) => any;
    value: string[];
    choices: PollChoice[];
    minVoteChoices: number;
    maxVoteChoices: number;
}


const MultipleChoice = ({
    choices,
    onChange,
    value,
    minVoteChoices,
    maxVoteChoices,
}: MultipleChoiceProps) => {
    const {t} = useTranslation();

    const change = (id: string, include: boolean) => {
        const uniqueValues = new Set(Array.isArray(value) ? value : []);

        if (include) {
            uniqueValues.add(id);
        } else {
            uniqueValues.delete(id);
        }
        onChange(Array.from(uniqueValues));
    };

    return (
        <>
            <Box pb={2}>
                {(() => {
                    if (minVoteChoices === maxVoteChoices) {
                        return (
                            <Typography variant="body1" color={value?.length === minVoteChoices ? "textPrimary" : "error"}>
                                {t("Wähle {{amount}} Elemente aus")}
                            </Typography>
                        );
                    } else {
                        return (
                            <Typography
                                variant="body1"
                                color={value?.length >= minVoteChoices && value?.length <= maxVoteChoices
                                    ? "textPrimary"
                                    : "error"}
                            >
                                <Trans>
                                    Wähle zwischen{" "}
                                    <Box component="span" fontWeight={value?.length >= minVoteChoices ? 100 : 900}>
                                        {{minVoteChoices}}
                                    </Box>
                                    {" "}
                                        -
                                    {" "}
                                    <Box component="span" fontWeight={value?.length <= maxVoteChoices ? 100 : 900}>
                                        {{maxVoteChoices}}
                                    </Box>
                                    {" "}Elementen aus
                                </Trans>
                            </Typography>
                        );
                    }
                })}
            </Box>
            <FormGroup>
                {choices.map(choice =>
                    <ButtonLike
                        key={choice.id}
                        justifyContent="flex-start"
                        color={choice.color}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value?.includes?.(choice.id) ?? false}
                                    style={{
                                        color: choice.color,
                                    }}
                                    onChange={event => change(choice.id, event.target.checked)}
                                />
                            }
                            label={choice.text}
                            style={{
                                width: "100%",
                            }}
                        />
                    </ButtonLike>)}
            </FormGroup>
        </>
    );
};

export default MultipleChoice;
