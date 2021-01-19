import React, {memo} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {PollChoice} from "types";

import {ButtonLike} from "../components";


export interface ISingleChoice {
    onChange: (value: string) => any;
    value: string;
    choices: PollChoice[];
}


const SingleChoice = ({onChange, value, choices}: ISingleChoice) => {
    return (
        <RadioGroup
            name="poll_choice_select_radio_group"
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {choices.map(choice =>
                <ButtonLike key={choice.id} justifyContent="flex-start" color={choice.color}>
                    <FormControlLabel
                        control={
                            <Radio
                                style={{
                                    color: choice.color,
                                }}
                            />
                        }
                        label={choice.text}
                        value={choice.id}
                        style={{
                            width: "100%",
                        }}
                    />
                </ButtonLike>)}
        </RadioGroup>
    );
};

export default memo(SingleChoice);
