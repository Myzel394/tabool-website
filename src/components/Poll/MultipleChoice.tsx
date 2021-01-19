import React from "react";
import {Box, Checkbox, FormControlLabel, FormGroup, Typography} from "@material-ui/core";
import {PollChoice} from "types";
import {useTranslation} from "react-i18next";

import {ButtonLike} from "../components";


export interface IMultipleChoice {
    onChange: (value: string[]) => any;
    value: string[];
    choices: PollChoice[];
    voteChoicesAmount: number;
}


const MultipleChoice = ({
    choices,
    onChange,
    value,
    voteChoicesAmount,
}: IMultipleChoice) => {
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
                <Typography variant="body1" color={value?.length === voteChoicesAmount ? "textPrimary" : "error"}>
                    {t("Wähle {{amount}} Elemente aus", {
                        amount: voteChoicesAmount,
                    })}
                </Typography>
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
