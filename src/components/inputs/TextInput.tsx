import React, {memo, ReactNode, useCallback, useState} from "react";
import {FormControl, InputLabel, InputProps, OutlinedInput} from "@material-ui/core";
import {useUniqueId} from "hooks";

export type ITextInput = InputProps & {
    validators?: ((value: string) => undefined | string)[];
    label?: ReactNode;
};

const TextInput = (props: ITextInput) => {
    const {
        validators,
        onChange,
        onBlur,
        label,
        ...other
    } = props;

    const formId = useUniqueId();
    const [value, setValue] = useState();
    const [error, setError] = useState<string | null>(null);
    const callValidators = useCallback((value: string): boolean => {
        // Validates the value and returns whether the value is valid.
        setError(null);

        for (const validator of validators || []) {
            const returnValue = validator(value);

            if (typeof returnValue === "string") {
                setError(returnValue);
                return false;
            }
        }
        return true;
    }, [validators]);

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor={formId}>{label}</InputLabel>
            <OutlinedInput
                {...other}
                {...(
                    error ? {
                        helperText: error,
                        error: true,
                    } : {}
                )}
                label={label}
                id={formId}
                onBlur={(event) => {
                    // Super
                    if (onBlur) {
                        onBlur(event);
                    }

                    callValidators(value);

                }}
                onChange={event => {
                    // Super
                    if (onChange) {
                        onChange(event);
                    }

                    setValue(event.target.value);

                    // Just call validators when there is already an error. (Better UX)
                    if (error) {
                        callValidators(value);
                    }
                }}
            />
        </FormControl>
    );
};

TextInput.defaultProps = {
    validators: [],
};

export default memo(TextInput);
