import React, {memo, useCallback, useMemo, useState} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import commonValidators from "common-validators";
import {useTranslation} from "react-i18next";

export type ITextInput = Omit<TextFieldProps, "variant" | "helperText"> & {
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
    ...other
}: ITextInput) => {
    const {t} = useTranslation();
    const [value, setValue] = useState();
    const [validationError, setValidationError] = useState<string | null>(null);
    const allValidators = useMemo((): Function[] => {
        const allValidators = validators || [];

        if (minLength) {
            allValidators.push(value => {
                if (commonValidators.minLength(minLength, value.length)) {
                    return t(`Das Feld muss mindestens ${minLength} Zeichen lang sein`);
                }
            });
        }
        if (maxLength) {
            allValidators.push(value => {
                if (commonValidators.maxLength(maxLength, value.length)) {
                    return t(`Das Feld darf nicht länger als ${minLength} Zeichen lang sein`);
                }
            });
        }

        return allValidators;
    }, [validators, t, minLength, maxLength]);

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
        <TextField
            {...other}
            variant="outlined"
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
    );
};

TextInput.defaultProps = {
    validators: [],
    error: false,
    errorMessages: [],
};

export default memo(TextInput);
