import React, {memo, ReactNode, useCallback, useMemo, useState} from "react";
import {FormControl, FormHelperText, InputLabel, InputProps, OutlinedInput} from "@material-ui/core";
import {useUniqueId} from "hooks";

export type ITextInput = InputProps & {
    validators?: ((value: string) => undefined | string)[];
    label?: ReactNode;
    error?: boolean;
    errorMessages?: string[];
};

const TextInput = (props: ITextInput) => {
    const {
        validators,
        onChange,
        onBlur,
        label,
        error,
        errorMessages,
        ...other
    } = props;

    const formId = useUniqueId();
    const [value, setValue] = useState();
    const [validationError, setValidationError] = useState<string | null>(null);
    const callValidators = useCallback((value: string): boolean => {
        // Validates the value and returns whether the value is valid.
        setValidationError(null);

        for (const validator of validators || []) {
            const returnValue = validator(value);

            if (typeof returnValue === "string") {
                setValidationError(returnValue);
                return false;
            }
        }
        return true;
    }, [validators]);
    const areErrorMessagesSet = useMemo(() => errorMessages && errorMessages.length > 0, [errorMessages]);
    const renderMessage = useCallback((message: string, index: number) =>
        <FormHelperText error key={index}>{message}</FormHelperText>
    , []);

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor={formId}>{label}</InputLabel>
            <OutlinedInput
                {...other}
                error={error || areErrorMessagesSet || validationError != null}
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
                    if (validationError) {
                        callValidators(value);
                    }
                }}
            />
            {validationError && <FormHelperText error>{validationError}</FormHelperText>}
            {errorMessages && errorMessages.length > 0 &&
                <div>
                    {errorMessages.map(renderMessage)}
                </div>
            }
        </FormControl>
    );
};

TextInput.defaultProps = {
    validators: [],
    error: false,
    errorMessages: [],
};

export default memo(TextInput);
