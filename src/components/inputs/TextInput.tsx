import React, {memo, useCallback, useMemo, useState} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import {useLengthValidator} from "hooks/validators";

export type ITextInput = Omit<TextFieldProps, "helperText"> & {
    validators?: ((value: string) => undefined | string)[];
    error?: boolean;
    errorMessages?: string[];
    minLength?: number;
    maxLength?: number;
};

const TextInput = ({
    validators,
    onChange,
    onBlur,
    error,
    errorMessages,
    minLength,
    maxLength,
    variant = "standard",
    ...other
}: ITextInput) => {
    const [value, setValue] = useState<string>();
    const [validationError, setValidationError] = useState<string | null>(null);
    const lengthValidator = useLengthValidator(minLength, maxLength);

    const allValidators = useMemo((): Function[] => {
        const allValidators = validators || [];

        allValidators.push(lengthValidator);

        return allValidators;
    }, [validators, lengthValidator]);

    const callValidators = useCallback((value: string): boolean => {
        // Validates the value and returns whether the value is valid.
        setValidationError(null);

        for (const validator of allValidators) {
            const returnValue = validator(value);

            if (typeof returnValue === "string") {
                setValidationError(returnValue);
                return false;
            }
        }
        return true;
    }, [allValidators]);
    const renderMessage = useCallback((message: string, key = undefined) =>
        <span key={key}>
            {message}
            <br />
        </span>
    , []);
    const areErrorMessagesSet = errorMessages && errorMessages.length > 0;

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TextField
            variant={variant}
            {...other}
            error={error || areErrorMessagesSet || validationError != null}
            helperText={
                <>
                    {validationError && renderMessage(validationError)}
                    {errorMessages && errorMessages.map(renderMessage)}
                </>
            }
            onBlur={(event) => {
                // Super
                if (onBlur) {
                    onBlur(event);
                }

                if (typeof value === "string") {
                    callValidators(value);
                }
            }}
            onChange={event => {
                // Super
                if (onChange) {
                    onChange(event);
                }

                const value = event?.target?.value;

                if (value === "string") {
                    setValue(value);
                }

                // Just call validators when there is already an error. (Eager evaluation)
                if (validationError) {
                    callValidators(value);
                }
            }}
        />
    );
};

TextInput.defaultProps = {
    validators: [],
    error: false,
    errorMessages: [],
    variant: "outlined",
};

export default memo(TextInput);
