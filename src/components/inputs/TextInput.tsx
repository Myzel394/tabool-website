import React, {memo, useCallback, useState} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";

export type ITextInput = Omit<TextFieldProps, "variant" | "helperText"> & {
    validators?: ((value: string) => undefined | string)[];
    error?: boolean;
    errorMessages?: string[];
};

const TextInput = ({
    validators,
    onChange,
    onBlur,
    error,
    errorMessages,
    ...other
}: ITextInput) => {
    const [value, setValue] = useState();
    const [validationError, setValidationError] = useState<string | null>(null);
    const callValidators = (value: string): boolean => {
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
    };
    const areErrorMessagesSet = errorMessages && errorMessages.length > 0;
    const renderMessage = useCallback((message: string, key = undefined) =>
        <div key={key}>
            <span>{message}</span>
            <br />
        </div>
    , []);
    const renderHelperText = useCallback(() => {
        return (
            <>
                {validationError && renderMessage(validationError)}
                {errorMessages && errorMessages.map(renderMessage)}
            </>
        );
    }, [errorMessages, validationError]);

    return (
        <TextField
            {...other}
            variant="outlined"
            error={error || areErrorMessagesSet || validationError != null}
            helperText={renderHelperText()}
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
